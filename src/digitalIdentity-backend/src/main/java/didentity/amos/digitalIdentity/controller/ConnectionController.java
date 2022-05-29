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

import java.util.Iterator;
import java.util.LinkedList;

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

    public boolean unavailable() {
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

        if (unavailable() == false) {
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

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> getConnection(@RequestParam Integer id, @RequestParam(required = false) String authorization) {
        if (authorization == null) {
            return ResponseEntity.status(401)
                    .body("Unauthorized, missing authentification");
        }

        // TODO: update authorization via func
        if (authentification(authorization) == false) {
            return ResponseEntity.status(403)
                    .body("Forbidden");
        }

        if (unavailable() == false) {
            return ResponseEntity.status(404)
                    .body("Not Found");
        }

        // Send 200 with the following json
        // build custom json using the toString method

        //get all DIs for given id
        LinkedList<Integer> ids = new LinkedList<Integer>();
        ids.add(id);
        Iterable<User> DIs = userRepository.findAllById(ids);
        
        Iterable<User> users = userRepository.findAll();
        if (users == null) {
            System.out.println("users is null");
        }
        for (User user : users) {
            System.out.println(user.getId());
            if (id.equals(user.getId())) {
                System.out.println("found");
            }
        }
        //get Iterator for DIs
        Iterator<User> diIterator = DIs.iterator();
        if (!diIterator.hasNext()) {
            return ResponseEntity.status(500).body("\"No DI with this id was found!\"");
        }
        User firstDI = diIterator.next();
        
        //construct json string of DI
        String json_string = firstDI.toString();

        System.out.println(json_string);
        //check if id is in use more than once
        if (diIterator.hasNext()) {
            System.out.println(diIterator.next().toString());
            return ResponseEntity.status(500).body("\"More than one DI with the same id was found!\"");
        }

        return ResponseEntity.status(200).body(json_string);
    }

}