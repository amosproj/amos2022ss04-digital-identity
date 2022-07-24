package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.services.PresentationProofService;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.*;

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
            @RequestParam(required = false) String connectionId ,
            @RequestParam(required = false) String proofTemplateId ) {

        return presentationProofService.sendProofTemplateToConnection(connectionId, proofTemplateId);
    }



    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> all(
            @RequestParam(required = true) String proofTemplateId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size) {



        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        return presentationProofService.getAllProofTemplates(proofTemplateId, page, size);
    }

    /**
     * C
     */
    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProof(@RequestParam String id) {

        return presentationProofService.getProofInstance(id);
    }

    /**
     *
     */
    @GetMapping(path = "/log", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getProofLog(
            @RequestParam(required = true) String proofTemplateId,
            @RequestParam(required = false) String connectionSearchText,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String size) {

        if (page == null || page == "") {
            page = "0";
        }
        if (size == null || size == "") {
            size = "10";
        }

        if (connectionSearchText == null) {
            connectionSearchText = "";
        }

        return presentationProofService.getProofLog(proofTemplateId, connectionSearchText, page, size);
    }
}
