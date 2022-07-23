package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.messages.answers.credentials.CredentialInstanceAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialLogAnswer;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.CredentialService;

@Controller
@RequestMapping(path = "/credential")
// TODO: should be called credentials as all ops are operating on all instances
// of credentials and not just one
public class CredentialController {

    @Autowired
    private CredentialService credentialService;

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * 
     */
    @GetMapping(path = "/overview", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> overview(
            @RequestParam(required = true) String connectionId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return ResponseEntity.status(401).body(null);
        }

        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        return credentialService.getCredentialDiOverview(connectionId, page, size);
    }

    /**
     * 
     * Issue a credential to an existing connection
     * 
     * @param connectionId           connectionId of existing connection
     * @param credentialDefinitionId credentialDefinitionId of existing credential
     * @param attributes             in form: [{\"name\": \"Name\",\"value\":
     *                               \"Max\"},{\"name\": \"Wohnort\",\"value\":
     *                               \"Berlin\"}]
     * @return response
     */
    @PostMapping(path = "/issue", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> issue(
            @RequestParam String connectionId,
            @RequestParam String credentialDefinitionId,
            @RequestBody String attributes // TODO: Fix this **** (change to accept a List of Attributes) {
    ) {
        return credentialService.issue(connectionId, credentialDefinitionId, attributes);
    }

    /**
     * 
     */
    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<PagedCredentialAnswer> all(
            @RequestParam(required = true) String credentialDefinitionId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size) {

        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        return credentialService.getAllCredentials(credentialDefinitionId, page, size, false);
    }

    /**
     * 
     */
    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<CredentialInstanceAnswer> getCredential(@RequestParam String id) {

        return credentialService.getCredentialInstance(id);
    }

    /**
     * 
     */
    @GetMapping(path = "/log", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<PagedCredentialLogAnswer> getCredentialLog(
            @RequestParam(required = true) String credentialDefinitionId,
            @RequestParam(required = false) String connectionSearchText,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size) {

        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        if (connectionSearchText == null) {
            connectionSearchText = "";
        }

        return credentialService.getCredentialLog(credentialDefinitionId, connectionSearchText, page, size);
    }

}
