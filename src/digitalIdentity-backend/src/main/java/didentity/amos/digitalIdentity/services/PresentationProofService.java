package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PresentationProofService {

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    public ResponseEntity<String> getProofDiOverview(String connectionId, String page,
            String size) {
        ResponseEntity<String> response = lissiApiService.getProofDiOverview(connectionId,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<String> sendProofTemplateToConnection(String connectionId, String proofTemplateId) {

        ResponseEntity<String> response = lissiApiService
                .sendProofTemplateToConnection(connectionId, proofTemplateId);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not send proof request to connection.");
        }
        return ResponseEntity.status(200).body(response.getBody());
    }
    
}
