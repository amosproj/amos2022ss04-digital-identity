package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.answers.credentials.PaggedCredentialAnswer;

@Service
public class CredentialService {

    @Autowired
    private LissiApiService lissiApiService;

    public ResponseEntity<String> issue(String connectionId, String credentialDefinitionId, String attributes) {

        ResponseEntity<String> response = lissiApiService.issueCredential(connectionId, credentialDefinitionId,
                attributes);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not issue connection to credential.");
        }
        return ResponseEntity.status(201).body(response.getBody());
    }

    public ResponseEntity<PaggedCredentialAnswer> getAllCredentials(String credentialDefinitionId, String page,
            String size) {
        ResponseEntity<PaggedCredentialAnswer> response = lissiApiService.getAllCredentials(credentialDefinitionId,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<String> logGroupedByConnection(String credDefId, String page, String size) {

        // ResponseEntity<String> response = lissiApiService.logCredentials(credDefId,
        // page,
        // size);

        return null;
    }

}
