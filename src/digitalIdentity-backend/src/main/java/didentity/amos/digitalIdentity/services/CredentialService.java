package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public class CredentialService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> create(String alias, String schemaId) {

        String imageUri = "null";

        boolean succesfullyCreated = lissiApiService.createCredential(alias, imageUri, schemaId);

        if (succesfullyCreated) {
            return ResponseEntity.status(201).body("Succesfully created a new credtial.");
        }
        return ResponseEntity.status(500).body("Could not create a new credential.");
    }

}
