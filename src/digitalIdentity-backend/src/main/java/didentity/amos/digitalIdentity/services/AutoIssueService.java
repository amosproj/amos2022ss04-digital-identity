package didentity.amos.digitalIdentity.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.Duration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.proofs.presentation.ProofResponse;
import didentity.amos.digitalIdentity.messages.responses.proofs.presentation.Attribute;
import didentity.amos.digitalIdentity.messages.responses.proofs.presentation.Proof;
import didentity.amos.digitalIdentity.model.actions.AutoIssueAction;
import didentity.amos.digitalIdentity.model.actions.AutoIssueDef;
import didentity.amos.digitalIdentity.model.actions.AutoIssueDefAttributesMapping;
import didentity.amos.digitalIdentity.repository.AutoIssueActionRepository;
import didentity.amos.digitalIdentity.repository.AutoIssueDefRepository;

@Service
public class AutoIssueService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private CredentialService credentialService;

    @Autowired
    private AutoIssueActionRepository autoIssueActionRepository;

    @Autowired
    private AutoIssueDefRepository autoIssueDefRepository;

    private Logger logger = LoggerFactory.getLogger(AutoIssueService.class);

    public void handleAutoIssueActions() {
        Iterable<AutoIssueAction> autoIssueActions = autoIssueActionRepository.findAll();
        Set<AutoIssueAction> toDelete = new HashSet<AutoIssueAction>();
        int found = 0;
        int completed = 0;
        int awaiting = 0;
        int timeouted = 0;
        logger.debug("checking for *auto issue credential on proof presentation* jobs (AutoIssueAction.class)");
        for (AutoIssueAction action : autoIssueActions) {
            logger.debug("Found AutoIssueAction:" + action);
            String exit = handleSingleAutoIssue(action);

            if (exit.equals("awating") == false) {
                toDelete.add(action);
            }
            // handle logging stats
            logger.debug("action " + exit + ":" + action);
            found++;

            switch (exit) {
                case "completed":
                    completed++;
                    break;
                case "timeout":
                    timeouted++;
                    break;
                case "awating":
                    awaiting++;
                default:
                    break;
            }
        }
        // Delete 'completed', 'timeouted ',
        for (AutoIssueAction job : toDelete) {
            autoIssueActionRepository.delete(job);
        }

        // TODO: delete completed

        logger.info("job stats for AutoIssueAction.class:" +
                "\tfound:" + found +
                "\tcompleted:" + completed +
                "\tawaiting:" + awaiting +
                "\ttimeouted:" + timeouted);

    }

    /**
     * 
     * @param action
     * @return "completed" if the task is completed and can be removed; "error" if
     *         an api call was not successfull or something else broke; "timeout" it
     */
    private String handleSingleAutoIssue(AutoIssueAction action) {
        ResponseEntity<ProofResponse> response = lissiApiService.getProofPresentation(action.getExchangeId());
        if (response == null) {
            // TODO: if the proof presentation is deleted, it will result in an error and it
            // will never be returned.
            return "error";
        }

        ProofResponse proof = response.getBody();

        if (proof.getProof().getState().equalsIgnoreCase("VERIFIED")) {
            return autoIssueCredential(
                    proof.getProof().getConnectionId(),
                    proof.getProof().getTemplateId(),
                    proof.getRevealedAttributes(),
                    proof.getSelfAttestedAttributes());
        } else if (timeouted(proof.getProof(), action)) {
            return "timeout";
        }

        return "awating";
    }

    private String autoIssueCredential(String connectionId, String proofTemplId,
            Map<String, List<Attribute>> revealedAttributes, List<Attribute> selfAttestedAttributes) {
        Optional<AutoIssueDef> actionDefOptional = autoIssueDefRepository.findByProofTemplateId(proofTemplId);
        if (actionDefOptional.isPresent() == false) {
            logger.error(
                    "found action instance but no actionDef for given proof template id: '" + proofTemplId + "'");
            return "error";
        }
        AutoIssueDef actionDef = actionDefOptional.get();
        List<Attribute> attrList = fillOutLinkedAttributeMapping(actionDef.getMapping(),
                toMapOfMap(revealedAttributes),
                toMap(selfAttestedAttributes));
        if (attrList == null) {
            return "error";
        }
        // send new credential
        ResponseEntity<String> issueResponse = credentialService.issue(
                connectionId,
                actionDef.getGoalCredDefId(),
                attrList.toString());
        if (issueResponse.getStatusCode().equals(HttpStatus.CREATED)) {
            return "completed";
        }

        logger.error("could not complete auto issue - failed during issue: " + issueResponse.getStatusCode() + " - "
                + issueResponse.getBody());
        return "error";
    }

    private List<Attribute> fillOutLinkedAttributeMapping(
            Set<AutoIssueDefAttributesMapping> mappingDef,
            Map<String, Map<String, Attribute>> revealedAttributes,
            Map<String, Attribute> selfAttestedAttributes) {
        List<Attribute> attrList = new LinkedList<Attribute>();

        for (AutoIssueDefAttributesMapping mapping : mappingDef) {
            Attribute attr = new Attribute();
            attr.setName(mapping.getDestAttribute());
            String value;
            String providerAttribute = mapping.getProviderAttribute();
            if (mapping.getSelfAttested()) {
                value = selfAttestedAttributes.get(providerAttribute).getValue();
            } else {
                String providerCredDef = mapping.getProviderCredDefId();
                Map<String, Attribute> revealedMap = revealedAttributes.get(providerCredDef);
                value = revealedMap.get(providerAttribute).getValue();
            }
            attr.setValue(value);
            attrList.add(attr);
        }

        return attrList;
    }

    private boolean timeouted(Proof proof, AutoIssueAction action) {
        Optional<AutoIssueDef> issueDefOptional = autoIssueDefRepository
                .findByProofTemplateId(action.getProofTemplateId());
        if (issueDefOptional.isPresent() == false) {
            // TODO: throw error
            return false;
        }
        AutoIssueDef issueDef = issueDefOptional.get();
        String timeout = issueDef.getTimeout();
        // prepare created at
        LocalDate createdAtDate = proof.getCreatedAtLocalDate();
        LocalTime createdAtTime = proof.getCreatedAtLocalTime();

        // prepare created now
        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        // difference
        long days = Period.between(createdAtDate, nowDate).getDays();
        Duration timeDiff = Duration.between(createdAtTime, nowTime);

        // timeout minutes
        if (timeout.contains("m")) {
            timeout = timeout.replace("m", "");
            try {
                int mm = Integer.parseInt(timeout);
                return timeDiff.toMinutes() > mm;
            } catch (Exception e) {
                e.printStackTrace();
                return true;
            }
        }
        // timeout hours
        else if (timeout.contains("h")) {
            timeout = timeout.replace("h", "");
            try {
                int hh = Integer.parseInt(timeout);
                return timeDiff.toHours() > hh;
            } catch (Exception e) {
                e.printStackTrace();
                return true;
            }
        } else if (timeout.contains("d")) {
            timeout = timeout.replace("d", "");
            try {
                int d = Integer.parseInt(timeout);
                return days > d;
            } catch (Exception e) {
                e.printStackTrace();
                return true;
            }
        }

        return false;
    }

    // TODO: move it to the Model class
    private Map<String, Attribute> toMap(List<Attribute> list) {
        Map<String, Attribute> map = new HashMap<String, Attribute>();
        for (Attribute attribute : list) {
            map.put(attribute.getName(), attribute);
        }
        return map;
    }

    // TODO: move it to the Model class
    private Map<String, Map<String, Attribute>> toMapOfMap(Map<String, List<Attribute>> oldMap) {
        Map<String, Map<String, Attribute>> map = new HashMap<String, Map<String, Attribute>>();
        for (String key : oldMap.keySet()) {
            map.put(key, toMap(oldMap.get(key)));
        }
        return map;
    }

}
