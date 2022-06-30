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
import didentity.amos.digitalIdentity.services.ProofTemplateService;

@Controller
@RequestMapping(path = "/proof-template")
public class ProofTemplateController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ProofTemplateService proofTemplateService;

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createProofTemplate(
            @RequestParam(required = false) String authorization,
            // @RequestParam String requestedSelfAttestedAttributes,
            // @RequestParam String requestedAttributes,
            // @RequestParam String requestedPredicates,
            // @RequestParam String requestedDeviceBindingVerifications,
            @RequestParam String name,
            @RequestParam String version) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return proofTemplateService.createProofTemplate(name, version);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProofTemplates(
            @RequestParam(required = false) String authorization,
            @RequestParam(required = false) String activeState,
            @RequestParam(required = false) String templateSearchText) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        if (activeState != null && !(activeState.equals("false") || activeState.equals("true"))) {
            return ResponseEntity.status(400).body("Bad Request. If present, activeState shall be 'true' or 'false'.");
        }

        return proofTemplateService.getAllProofTemplates(activeState, templateSearchText);
    }
}