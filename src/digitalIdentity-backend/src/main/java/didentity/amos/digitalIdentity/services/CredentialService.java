package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CredentialService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> issue(String connectionID, String credentialDefinitionId, Pair<String, String>[] attributes) {
        
        String response = lissiApiService.issueCredential(connectionID, credentialDefinitionId, attributes);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create issue connection to credential.");
        }
        return ResponseEntity.status(201).body(response);
    }
    
}
