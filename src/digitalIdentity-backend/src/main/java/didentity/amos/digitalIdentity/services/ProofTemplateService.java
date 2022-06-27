package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProofTemplateService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private ResourceService resourceService;

    public ResponseEntity<String> create(String name, String version, String requestedDeviceBindingVerifications) {
        File file = resourceService.getDummyPng();
        if (file == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        ResponseEntity<String> response = lissiApiService.createProofTemplate(name, version, requestedDeviceBindingVerifications, file);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create a new proof template.");
        }
        return ResponseEntity.status(201).body(response.getBody());
    }

    public ResponseEntity<String> getAllProofTemplates(String activeState, String searchText) {
        ResponseEntity<String> credDefs = lissiApiService.provideExistingProofTemplates(activeState, searchText);

        if (credDefs != null) {
            return credDefs;
        }
        return ResponseEntity.status(500).body("Internal Server Error during request. Lissi API might be not available.");
    }

}
