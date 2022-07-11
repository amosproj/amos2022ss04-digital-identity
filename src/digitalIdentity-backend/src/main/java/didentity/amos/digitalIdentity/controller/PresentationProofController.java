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
    private PresentationProofService presentationProofService;

    /**
     * 
     */
    @GetMapping(path = "/overview", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> overview(
            @RequestParam(required = true) String connectionId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return ResponseEntity.status(401).body(null);
        }

        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        return presentationProofService.getProofDiOverview(connectionId, page, size);
    }
    
    @PostMapping(path = "/send", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> sendProofTemplateToConnection(
            @RequestParam(required = false) String authorization,
            @RequestParam(required = false) String connectionId ,
            @RequestParam(required = false) String proofTemplateId ) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return presentationProofService.sendProofTemplateToConnection(connectionId, proofTemplateId);
    }
}
