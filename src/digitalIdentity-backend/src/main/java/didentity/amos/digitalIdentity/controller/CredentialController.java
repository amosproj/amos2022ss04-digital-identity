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
import didentity.amos.digitalIdentity.services.CredentialService;

@Controller
@RequestMapping(path = "/schema")
public class CredentialController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CredentialService credentialService;

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createCredential(
            @RequestParam(required = false) String authorization,
            @RequestParam String alias,
            @RequestParam String schemaId) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }
        
        return credentialService.create(alias, schemaId);
    }
}
