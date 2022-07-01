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

import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.CredentialService;

@Controller
@RequestMapping(path = "/credential")
public class CredentialController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CredentialService credentialService;

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
            @RequestBody String attributes,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return credentialService.issue(connectionId, credentialDefinitionId, attributes);
    }

    /**
     * 
     */
    @GetMapping(path = "/log/group/by/connections", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> logGroupedByConnection(
            @RequestParam(required = true) String credDefId,
            @RequestParam(required = true) String page,
            @RequestParam(required = true) String size,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }
        return null;
    }

}
