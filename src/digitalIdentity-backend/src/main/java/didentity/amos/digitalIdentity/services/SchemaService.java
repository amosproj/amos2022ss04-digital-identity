package didentity.amos.digitalIdentity.services;

import java.io.File;

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
        File file = null;
        attributes = "[" + attributes + "]";

        boolean success = lissiApiService.createSchema(alias, imageUri, version, attributes, file);

        if (success) {
            return ResponseEntity.status(201).body("Succesfully created a new schema.");
        }
        return ResponseEntity.status(500).body("Could not create a new schmema.");
    }
}