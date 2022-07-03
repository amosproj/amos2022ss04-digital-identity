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
import didentity.amos.digitalIdentity.services.PresentationProofService;

@Controller
@RequestMapping(path = "presentation-proof")
public class PresentationProofController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PresentationProofService PresentationProofService;
    
    @PostMapping(path = "/send", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> sendProofTemplateToConnection(
            @RequestParam(required = false) String authorization,
            @RequestParam(required = false) String connectionId ,
            @RequestParam(required = false) String proofTemplateId ) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return PresentationProofService.sendProofTemplateToConnection(connectionId, proofTemplateId);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getAllPresentationProofs(
            @RequestParam(required = false) String authorization,
            @RequestParam(required = false) String connectionId ,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size ) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return ResponseEntity.status(200).body((PresentationProofService.getAllPresentationProofs(connectionId, page, size).getBody().toString()));
    }
}
