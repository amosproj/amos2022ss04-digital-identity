package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.responses.CredentialDefinitionsResponse;

@Service
public class CredentialDefinitionService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private ResourceService resourceService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    public void setResourceService(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    public ResponseEntity<String> create(String alias, String comment, String schemaId, String revocable) {
        String imageUri = "null";
        File file = resourceService.getDummyPng();
        if (file == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        ResponseEntity<String> response = lissiApiService
                .createCredentialDefinition(alias, comment, imageUri, schemaId, file, revocable);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create a new credential.");
        }
        return ResponseEntity.status(201).body(response.getBody());
    }

    public ResponseEntity<CredentialDefinitionsResponse> getAllCredDefs(String activeState, String searchText) {
        ResponseEntity<CredentialDefinitionsResponse> credDefs = lissiApiService.provideExistingCredDefs(activeState, searchText);

        if (credDefs != null) {
            return credDefs;
        }
        return ResponseEntity.status(500)
                .body(null);
    }

}
