package didentity.amos.digitalIdentity.controller;

import java.util.List;

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
import didentity.amos.digitalIdentity.services.DIConnectionService;
import didentity.amos.digitalIdentity.model.Connection;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.security.HRAuthorization;

@Controller
@RequestMapping(path = "/connection")
public class ConnectionController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private DIConnectionService diConnectionService;

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<List<Connection>> getAll(@RequestParam(required = false) String authorization) {
        if (authenticationService.authentication(authorization) == false) {
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.status(200).body(diConnectionService.getAllConnections());
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<User> getConnection(@RequestParam Integer id,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return ResponseEntity.status(401).body(null);
        }

        User user = diConnectionService.getConnectionById(id);
        if (user == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(200).body(user);
    }

    // TODO: We need to restrict that only to the admin user / HR employee?
    @PostMapping(path = "/create")
    public @ResponseBody ResponseEntity<String> create(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String email,
            @RequestParam(required = false) String user_role,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }
        return diConnectionService.create(name, surname, email, user_role);
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<String> update(
            @RequestParam Integer id,
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String email,
            @RequestParam(required = false) String user_role,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return diConnectionService.update(id, name, surname, email, user_role);
    }

    @PostMapping(path = "/remove")
    public @ResponseBody ResponseEntity<String> remove(
            @RequestParam String connectionId,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return diConnectionService.remove(connectionId);
    }
}