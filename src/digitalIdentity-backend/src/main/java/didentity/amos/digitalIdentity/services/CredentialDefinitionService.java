package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CredentialDefinitionService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> create(String alias, String comment, String schemaId) {
        String imageUri = "null";
        File file = null;

        String response = lissiApiService.createCredentialDefinition(alias, comment, imageUri, schemaId, file);

        if (response != null) {
            return ResponseEntity.status(201).body(response);
        }
        return ResponseEntity.status(500).body("Could not create a new credential.");
    }

}
