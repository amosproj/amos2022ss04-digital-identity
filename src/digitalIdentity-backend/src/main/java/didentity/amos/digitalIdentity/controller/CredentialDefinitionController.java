package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    public @ResponseBody ResponseEntity<String> createCredDef(
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

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getCredDefs(
            @RequestParam(required = false) String authorization,
            @RequestParam(required = false) String activeState,
            @RequestParam(required = false) String searchText) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        if (activeState != null && !(activeState.equals("false") || activeState.equals("true"))) {
            return ResponseEntity.status(400).body("Bad Request. If present, activeState shall be 'true' or 'false'.");
        }

        return credentialDefinitionService.getAllCredDefs(activeState, searchText);
    }
}
