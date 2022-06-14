package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SchemaService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> createSchema(String alias,
            String version,
            String attributes) {

        // TODO implement image and imageUri later
        String imageUri = "null";
        attributes = "[" + attributes + "]";

        // TODO: maybe return the new schema instead
        boolean succesfullyCreated = lissiApiService.createSchema(alias, imageUri, version, attributes);

        if (succesfullyCreated) {
            return ResponseEntity.status(201).body("Succesfully created a new schema");
        }
        return ResponseEntity.status(500).body("Could not create a new schmema.");
    }

    public ResponseEntity<String> getAllSchema(String activeState, String searchText) {
        ResponseEntity<String> schemas = lissiApiService.provideExistingSchemas(activeState, searchText);

        if (schemas != null) {
            return schemas;
        }
        return ResponseEntity.status(500).body("Internal Server Error during request. Lissi API might be not available.");
    }
}