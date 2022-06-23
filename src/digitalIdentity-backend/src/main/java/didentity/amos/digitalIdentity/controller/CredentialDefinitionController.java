package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.CredentialDefinitionService;

@Controller
@RequestMapping(path = "/credential-definition")
public class CredentialDefinitionController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CredentialDefinitionService credentialDefinitionService;

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createCredential(
            @RequestParam(required = false) String authorization,
            @RequestParam String alias,
            @RequestParam String comment,
            @RequestParam boolean revocable,
            @RequestParam String schemaId) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return credentialDefinitionService.create(alias, comment, schemaId, revocable);
    }
}
