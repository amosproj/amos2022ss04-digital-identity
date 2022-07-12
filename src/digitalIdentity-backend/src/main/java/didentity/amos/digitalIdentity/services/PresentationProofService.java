package didentity.amos.digitalIdentity.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.proofs.SendPresentationProofResponse;
import didentity.amos.digitalIdentity.model.actions.AutoIssueAction;
import didentity.amos.digitalIdentity.model.actions.AutoIssueDef;
import didentity.amos.digitalIdentity.repository.AutoIssueActionRepository;
import didentity.amos.digitalIdentity.repository.AutoIssueDefRepository;

@Service
public class PresentationProofService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private AutoIssueDefRepository autoIssueRepository;

    @Autowired
    private AutoIssueActionRepository autoIssueActionRepository;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    public void setAutoIssueRepository(AutoIssueDefRepository autoIssueRepository) {
        this.autoIssueRepository = autoIssueRepository;
    }

    public void setAutoIssueActionRepository(AutoIssueActionRepository autoIssueActionRepository) {
        this.autoIssueActionRepository = autoIssueActionRepository;
    }

    public ResponseEntity<String> sendProofTemplateToConnection(String connectionId, String proofTemplateId) {

        ResponseEntity<SendPresentationProofResponse> response = lissiApiService
                .sendProofTemplateToConnection(connectionId, proofTemplateId);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not send proof request to connection.");
        }

        Optional<AutoIssueDef> autoIssueOptional = autoIssueRepository
                .findByProofTemplateId(proofTemplateId);
        if (autoIssueOptional.isPresent()) {
            // TODO: proper error message if this step fails
            setUpAutoIssue(proofTemplateId, connectionId, response.getBody().getExchangeId());
        }

        // return ResponseEntity.status(200).body(response.getBody());
        return ResponseEntity.status(200).body("Proof presentation request was sent.");
    }

    private void setUpAutoIssue(String proofTemplateId, String goalConnectionId, String exchangeId) {
        AutoIssueAction autoIssue = new AutoIssueAction();
        autoIssue.setProofTemplateId(proofTemplateId);
        autoIssue.setGoalConnectionId(goalConnectionId);
        autoIssue.setExchangeId(exchangeId);

        // autoIssueActionRepository.save(autoIssue);

    }

}
