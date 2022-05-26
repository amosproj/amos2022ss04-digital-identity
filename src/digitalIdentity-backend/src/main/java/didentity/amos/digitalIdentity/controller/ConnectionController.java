package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Controller
@RequestMapping(path = "/connection")
public class ConnectionController {

    @Autowired
    private UserRepository userRepository;

    public boolean authentification(String authorization) {
        // TODO: replace by correct authentification
        // method for testing
        return authorization.equalsIgnoreCase("passing") == true
                || authorization.equalsIgnoreCase("admin") == true;
    }

    public boolean unaviable() {
        // TODO: replace by correct lookup of service
        // method for testing
        return true;
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getAll(@RequestParam(required = false) String authorization) {

        if (authorization == null) {
            return ResponseEntity.status(401)
                    .body("Unauthorized, missing authentification");
        }

        // TODO: update authorization via func
        if (authentification(authorization) == false) {
            return ResponseEntity.status(403)
                    .body("Forbidden");
        }

        if (unaviable() == false) {
            return ResponseEntity.status(404)
                    .body("Not Found");
        }

        // Send 200 with the following json
        // build custom json using the toString method

        Iterable<User> users = userRepository.findAll();
        String json_string = "[";
        for (User user : users) {
            json_string += user.toString() + ",";
        }
        json_string += "]";

        return ResponseEntity.status(200).body(json_string);
    }

}