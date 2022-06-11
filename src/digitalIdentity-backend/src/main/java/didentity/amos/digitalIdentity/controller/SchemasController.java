package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.services.LissiApiService;

@Controller
@RequestMapping(path = "/schemas")
public class SchemasController {

    @Autowired
    private LissiApiService lissiApiService;

    public boolean authentification(String authorization) {
        // TODO: replace by correct authentification
        // method for testing
        return authorization.equalsIgnoreCase("passing") == true
                || authorization.equalsIgnoreCase("admin") == true;
    }

    public boolean unavailable() {
        // TODO: replace by correct lookup of service
        // method for testing
        return true;
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> createSchema(@RequestParam String authorization,
            @RequestParam String alias, @RequestParam String version,
            @RequestParam String attributes) {

        if (authorization == null) {
            return ResponseEntity.status(401)
                    .body("Unauthorized, missing authentification");
        }

        if (authentification(authorization) == false) {
            return ResponseEntity.status(403)
                    .body("Forbidden");
        }

        if (unavailable() == false) {
            return ResponseEntity.status(404)
                    .body("Not Found");
        }

        // TODO implement image and imageUri later
        String imageUri = "null";
        attributes = "[" + attributes + "]";

        boolean succesfullyCreated = lissiApiService.createSchema(alias, imageUri, version, attributes);

        if (succesfullyCreated) {
            return ResponseEntity.status(201).body("Succesfully created a new schema");
        }
        return ResponseEntity.status(500).body("Could not create a new schmema");
    }
}
