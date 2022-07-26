package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SchemaService {

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    @Autowired
    private ResourceService resourceService;

    public void setResourceService(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    public ResponseEntity<String> createSchema(String alias,
            String version,
            String attributes) {

        // TODO Fix this
        attributes = "[" + attributes + "]";
        // TODO implement image and imageUri later
        String imageUri = "null";

        File file = resourceService.getDummyPng();
        if (file == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        ResponseEntity<String> response = lissiApiService.createSchema(alias, imageUri, version, attributes, file);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create a new schema.");
        } else if (!response.getStatusCode().is2xxSuccessful()) {
            return response;
        }
        return ResponseEntity.status(201).body(response.getBody());
    }

    public ResponseEntity<String> getAllSchemas(String activeState, String searchText) {
        ResponseEntity<String> schemas = lissiApiService.provideExistingSchemas(activeState, searchText);

        if (schemas != null) {
            return schemas;
        }
        return ResponseEntity.status(500)
                .body("Internal Server Error during request. Lissi API might be not available.");
    }

    public ResponseEntity<String> getSchemaById(String id) {
        ResponseEntity<String> schemas = lissiApiService.getSchemaById(id);

        if (schemas != null) {
            return schemas;
        }
        return ResponseEntity.status(500)
                .body("Internal Server Error during request. Lissi API might be not available.");
    }
}