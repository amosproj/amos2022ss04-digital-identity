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

        boolean succesfullyCreated = lissiApiService.createSchema(alias, imageUri, version, attributes);

        if (succesfullyCreated) {
            return ResponseEntity.status(201).body("Succesfully created a new schema");
        }
        return ResponseEntity.status(500).body("Could not create a new schmema");
    }

    public ResponseEntity<?> getAllSchema(String activeState, String searchText) {
        return lissiApiService.provideExistingSchemas(activeState, searchText);
    }
}