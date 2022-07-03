package didentity.amos.digitalIdentity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.messages.answers.credentials.CredentialInstanceAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialLogAnswer;

@Service
public class CredentialService {

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    public ResponseEntity<String> issue(String connectionId, String credentialDefinitionId, String attributes) {

        ResponseEntity<String> response = lissiApiService.issueCredential(connectionId, credentialDefinitionId,
                attributes);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not issue connection to credential.");
        }
        return ResponseEntity.status(201).body(response.getBody());
    }

    public ResponseEntity<PagedCredentialAnswer> getAllCredentials(String credentialDefinitionId, String page,
            String size) {
        ResponseEntity<PagedCredentialAnswer> response = lissiApiService.getAllCredentials(credentialDefinitionId,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<CredentialInstanceAnswer> getCredentialInstance(String id) {
        ResponseEntity<CredentialInstanceAnswer> response = lissiApiService.getCredentialInstance(id);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

    public ResponseEntity<PagedCredentialLogAnswer> getCredentialLog(String credDefId, String connectionSearchText,
            String page, String size) {

        ResponseEntity<PagedCredentialLogAnswer> response = lissiApiService.getCredentialLog(credDefId,
                connectionSearchText,
                page,
                size);

        if (response == null) {
            return ResponseEntity.status(500).body(null);
        }
        return response;
    }

}
