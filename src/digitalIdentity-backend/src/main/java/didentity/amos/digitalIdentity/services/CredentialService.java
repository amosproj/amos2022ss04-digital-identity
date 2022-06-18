package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CredentialService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> issue(String connectionId, String credentialDefinitionId, String attributes) {
        
        String response = lissiApiService.issueCredential(connectionId, credentialDefinitionId, attributes);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not issue connection to credential.");
        }
        return ResponseEntity.status(201).body(response);
    }
    
}
