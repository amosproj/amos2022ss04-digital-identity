package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CredentialDefinitionService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private ResourceService resourceService;

    public ResponseEntity<String> create(String alias, String comment, String schemaId, boolean revocable) {
        String imageUri = "null";
        File file = resourceService.getDummyPng();
        if (file == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        String response = lissiApiService.createCredentialDefinition(alias, comment, imageUri, schemaId, file, revocable);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create a new credential.");
        }
        return ResponseEntity.status(201).body(response);
    }

}
