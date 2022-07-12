package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.PresentationProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public @ResponseBody ResponseEntity<String> all(
            @RequestParam(required = true) String proofTemplateId,
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

        return PresentationProofService.getAllProofTemplates(proofTemplateId, page, size);
    }

    /**
     * C
     */
    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProof(@RequestParam String id,
                                                                      @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return ResponseEntity.status(401).body(null);
        }

        return PresentationProofService.getProofInstance(id);
    }

    /**
     *
     */
    @GetMapping(path = "/log", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProofLog(
            @RequestParam(required = true) String proofTemplateId,
            @RequestParam(required = false) String connectionSearchText,
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

        if (connectionSearchText == null) {
            connectionSearchText = "";
        }

        return PresentationProofService.getProofLog(proofTemplateId, connectionSearchText, page, size);
    }
}
