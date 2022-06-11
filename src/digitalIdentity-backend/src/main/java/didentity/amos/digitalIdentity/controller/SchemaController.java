package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.SchemaService;

@Controller
@RequestMapping(path = "/schema")
public class SchemaController {

    @Autowired 
    private SchemaService schemaService;

    @Autowired
    private AuthenticationService authenticationService;

    public boolean unavailable() {
        // TODO: replace by correct lookup of service
        // method for testing
        return true;
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createSchema(@RequestParam String authorization,
            @RequestParam String alias, @RequestParam String version,
            @RequestParam String attributes) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return schemaService.createSchema(alias, version, attributes);
    }
}
