package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
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
    
    @PostMapping(path = "/issue")
    public @ResponseBody ResponseEntity<String> issue(@RequestParam String connectionId, @RequestParam String credentialDefinitionId, @RequestParam String attributes,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return credentialService.issue(connectionId, credentialDefinitionId, attributes);
    }
}
