package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.DIConnectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private DIConnectionService diConnectionService;

    // TODO: We need to restrict that only to the admin user / HR employee?
    @PostMapping(path = "/register")
    public @ResponseBody ResponseEntity<String> register(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String email,
            @RequestParam(required = false) String user_role,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }
        return diConnectionService.register(name, surname, email, user_role);
    }

    @PostMapping(path = "/login")
    public @ResponseBody ResponseEntity<String> login(
            @RequestParam String email,
            @RequestParam String password) {
        return authenticationService.login(email, password);
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
}