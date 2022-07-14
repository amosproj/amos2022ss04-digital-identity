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

import didentity.amos.digitalIdentity.services.CredentialDefinitionService;

@Controller
@RequestMapping(path = "/credential-definition")
public class CredentialDefinitionController {

    @Autowired
    private CredentialDefinitionService credentialDefinitionService;

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createCredDef(
            @RequestParam String alias,
            @RequestParam String comment,
            @RequestParam String revocable,
            @RequestParam String schemaId) {

        return credentialDefinitionService.create(alias, comment, schemaId, revocable);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getCredDefs(
            @RequestParam(required = false) String activeState,
            @RequestParam(required = false) String searchText) {

        if (activeState != null && !(activeState.equals("false") || activeState.equals("true"))) {
            return ResponseEntity.status(400).body("Bad Request. If present, activeState shall be 'true' or 'false'.");
        }

        return credentialDefinitionService.getAllCredDefs(activeState, searchText);
    }
}
