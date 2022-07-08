package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.services.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping(path = "/login")
    public @ResponseBody ResponseEntity<Boolean> login() {
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping(path = "/password/change")
    public @ResponseBody ResponseEntity<String> changePassword(
            @RequestParam String email,
            @RequestParam String old_password,
            @RequestParam String new_password) {

        return authenticationService.handleChangePassword(email, old_password, new_password);
    }

    @PostMapping(path = "/password/forgot")
    public @ResponseBody ResponseEntity<String> forgotPassword(
            @RequestParam String email) {

        return authenticationService.handleForgotPassword(email);
    }
}