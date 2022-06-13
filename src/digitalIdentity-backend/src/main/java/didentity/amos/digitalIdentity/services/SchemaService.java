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
        File file = null; // TODO: needs to be connected!
        attributes = "[" + attributes + "]";

        String response = lissiApiService.createSchema(alias, imageUri, version, attributes, file);

        if (response != null) {
            return ResponseEntity.status(201).body(response);
        }
        return ResponseEntity.status(500).body("Could not create a new schmema.");
    }
}