package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProofService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private ResourceService resourceService;

    public ResponseEntity<String> createProof(String requestedSelfAttestedAttributes,
            String revocationFilterType,
            String requestedAttributes,
            String name,
            String requestedPredicates,
            String requestedDeviceBindingVerifications,
            String version,
            String revocationFilterTimes) {

        File image = resourceService.getDummyPng();
        if (image == null) {
            return ResponseEntity.status(500).body("Could not find image.");
        }

        return lissiApiService.createProof(image, requestedSelfAttestedAttributes, revocationFilterType, requestedAttributes, name, requestedPredicates, requestedDeviceBindingVerifications, version, revocationFilterTimes);
    }
    
}
