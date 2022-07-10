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

    public ResponseEntity<String> sendProofTemplateToConnection(String connectionId, String proofTemplateId) {

        ResponseEntity<String> response = lissiApiService
                .sendProofTemplateToConnection(connectionId, proofTemplateId);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not send proof request to connection.");
        }
        return ResponseEntity.status(200).body(response.getBody());
    }

    public ResponseEntity<String> getAllProofTemplates(String proofTemplateId, String page, String size) {
        ResponseEntity<String> response = lissiApiService.getAllProofs(proofTemplateId,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<String> getProofInstance(String id) {
        ResponseEntity<String> response = lissiApiService.getProofInstance(id);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<String> getProofLog(String proofTemplateId, String connectionSearchText, String page, String size) {
        ResponseEntity<String> response = lissiApiService.getProofLog(proofTemplateId,
                connectionSearchText,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }
}
