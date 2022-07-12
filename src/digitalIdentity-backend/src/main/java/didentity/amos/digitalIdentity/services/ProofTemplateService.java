package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueCredentialActionResponse;
import didentity.amos.digitalIdentity.messages.responses.proofs.CreateProofTemplateResponse;
import didentity.amos.digitalIdentity.model.proofs.AutoIssueCredentialAction;
import didentity.amos.digitalIdentity.repository.AutoIssueCredentialActionRepository;

@Service
public class ProofTemplateService {

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    @Autowired
    private AutoIssueCredentialActionRepository autoIssueRepository;

    @Autowired
    private ResourceService resourceService;

    public void setResourceService(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    public ResponseEntity<String> createProofTemplate(String name, String version, String requestedAttributes,
            String requestedPredicates,
            String requestedSelfAttestedAttributes, File image, AutoIssueCredentialActionResponse autoIssueCredential) {
        if (image == null) {
            image = resourceService.getDummyPng();
        }
        if (image == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        ResponseEntity<CreateProofTemplateResponse> response = lissiApiService.createProofTemplate(name, version,
                requestedAttributes,
                requestedPredicates,
                requestedSelfAttestedAttributes, image);

        if (response == null) {
            return ResponseEntity.status(500).body("\"Could not create a new proof template.\"");
        }
        if (autoIssueCredential != null) {
            CreateProofTemplateResponse proofTempl = response.getBody();
            AutoIssueCredentialAction entity = AutoIssueCredentialAction.createFromResponse(autoIssueCredential);
            entity.setProofTemplateId(proofTempl.getTemplateId());

            autoIssueRepository.save(entity);
            // TODO: check if fails and remove proofTemplate on lissi ledger
        }
        return ResponseEntity.status(201).body("\"Created new proof template.\"");
    }

    public ResponseEntity<String> getAllProofTemplates(String activeState, String searchText) {
        ResponseEntity<String> credDefs = lissiApiService.provideExistingProofTemplates(activeState, searchText);

        if (credDefs != null) {
            return credDefs;
        }
        return ResponseEntity.status(500)
                .body("Internal Server Error during request. Lissi API might be not available.");
    }

}
