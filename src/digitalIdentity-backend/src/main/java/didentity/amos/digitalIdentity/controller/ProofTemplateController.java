package didentity.amos.digitalIdentity.controller;

import java.io.File;

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

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueDefResponse;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.ProofTemplateService;

@Controller
@RequestMapping(path = "/proof-template")
public class ProofTemplateController {

    @Autowired
    private ProofTemplateService proofTemplateService;

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createProofTemplate(
            @RequestParam(required = false) String requestedSelfAttestedAttributes,
            @RequestParam String requestedPredicates,
            @RequestParam String requestedAttributes,
            @RequestParam String name,
            @RequestParam String version,
            @RequestParam(required = false) File image,
            @RequestBody(required = false) AutoIssueDefResponse autoIssueCredential) {

        return proofTemplateService.createProofTemplate(name, version,
                requestedAttributes, requestedPredicates,
                requestedSelfAttestedAttributes, image, autoIssueCredential);

    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProofTemplates(
            @RequestParam(required = false) String activeState,
            @RequestParam(required = false) String templateSearchText) {

        if (activeState != null && !(activeState.equals("false") || activeState.equals("true"))) {
            return ResponseEntity.status(400).body("Bad Request. If present, activeState shall be 'true' or 'false'.");
        }

        return proofTemplateService.getAllProofTemplates(activeState, templateSearchText);
    }
}
