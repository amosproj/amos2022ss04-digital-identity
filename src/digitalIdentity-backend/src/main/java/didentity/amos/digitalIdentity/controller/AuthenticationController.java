package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.services.AuthenticationService;

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

    @PostMapping(path = "/login")
    public @ResponseBody ResponseEntity<String> login(
            @RequestParam String email,
            @RequestParam String password) {
        return authenticationService.login(email, password);
    }

    @PostMapping(path = "/password/change")
    public @ResponseBody ResponseEntity<String> changePassword(
            @RequestParam String email,
            @RequestParam String old_password,
            @RequestParam String new_password,
            @RequestParam(required = false) String authorization) {

        if (authenticationService.authentication(authorization) == false) {
            return authenticationService.getError();
        }

        return authenticationService.handleChangePassword(email, old_password, new_password);
    }
}