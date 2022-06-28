package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.ProofService;

@Controller
@RequestMapping(path = "/proof")
public class ProofController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ProofService proofService;

    // TODO RequestParam image can be added
    @PostMapping(path = "/create")
    public @ResponseBody ResponseEntity<String> createProof(
            @RequestParam String requestedSelfAttestedAttributes,
            @RequestParam String revocationFilterType,
            @RequestParam String requestedAttributes,
            @RequestParam String name,
            @RequestParam String requestedPredicates,
            @RequestParam String requestedDeviceBindingVerifications,
            @RequestParam String version,
            @RequestParam String revocationFilterTimes,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return proofService.createProof(requestedSelfAttestedAttributes, revocationFilterType, requestedAttributes, name, requestedPredicates, requestedDeviceBindingVerifications, version, revocationFilterTimes);
    }
    
}
