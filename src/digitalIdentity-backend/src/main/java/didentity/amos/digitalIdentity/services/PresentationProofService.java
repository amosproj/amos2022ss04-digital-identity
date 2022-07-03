package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.PresentationProofsResponse;

@Service
public class PresentationProofService {

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    public ResponseEntity<String> sendProofTemplateToConnection(String connectionId, String proofTemplateId) {

        ResponseEntity<String> response = lissiApiService
                .sendProofTemplateToConnection(connectionId, proofTemplateId);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not send proof request to connection.");
        }
        return ResponseEntity.status(200).body(response.getBody());
    }

    public ResponseEntity<PresentationProofsResponse> getAllPresentationProofs(String connectionId, String page, String size) {

        ResponseEntity<PresentationProofsResponse> response = lissiApiService
                .getAllPresentationProofs(connectionId, page, size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }
    
}
