package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import didentity.amos.digitalIdentity.services.LissiApiService;
import didentity.amos.digitalIdentity.services.MailService;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.enums.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;
import java.util.LinkedList;

@Controller
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private AuthenticationService authiService;

    // TODO: We need to restrict that only to the admin user / HR employee?
    @PostMapping(path = "/register")
    public @ResponseBody ResponseEntity<String> register(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String email,
            @RequestParam(required = false) String user_role,
            @RequestParam(required = false) String authorization) {

        if (authiService.authentication(authorization) == false) {
            return authiService.getError();
        }

        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);

        // TODO: create onetime password
        user.setPassword("test");

        if (user_role != null && user_role != "") {
            switch (user_role) {
                case "admin":
                    user.setUserRole(UserRole.fromString("ROLE_ADMIN"));
                    break;
                case "employee":
                    user.setUserRole(UserRole.fromString("ROLE_EMPLOYEE"));
                    break;
                case "hr_employee":
                    user.setUserRole(UserRole.fromString("ROLE_HR_EMPLOYEE"));
                    break;
                case "guest":
                    user.setUserRole(UserRole.fromString("ROLE_GUEST"));
                    break;
                default:
                    return ResponseEntity.status(500).body("\"User role not recognized.\"");
            }
        }

        userRepository.save(user);

        try {
            String invitationUrl = lissiApiService.createConnectionInvitation(email);
            String mailSuccess = mailService.sendInvitation(email, invitationUrl);
            if (!mailSuccess.equals("success")) {
                return ResponseEntity.status(500).body("\"Mail couldn't be sent! Error: " + mailSuccess + "\"");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("\"Invitation in Lissi could not be created! Error: " + e.toString() + "\"");
        }
        return ResponseEntity.status(200).body("\"Successful creation of the digital identity.\"");

        // TODO:
        // error 400: if email address is already in use for another connection/DI (this
        // test has to be implemented first!)
    }

    @PostMapping(path = "/login")
    public @ResponseBody ResponseEntity<String> login(
            @RequestParam String email,
            @RequestParam String password) {

        if (email == null || email == "") {
            return ResponseEntity.status(400).body("\"Bad request. Email is empty.\"");
        }

        if (password == null || password == "") {
            return ResponseEntity.status(400).body("\"Bad request. Password is empty.\"");
        }

        // TODO Jannik: findAll() ist ziemlich inperformant; Ich wusste leider nicht wie
        // man e_mail und password direkt im Repository abfragen kann
        Iterable<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                return ResponseEntity.status(200).body("\"Login successful.\"");
            }
        }
        return ResponseEntity.status(200).body("\"Password and username do not match.\"");
    }

    @PostMapping(path = "/update")
    public @ResponseBody ResponseEntity<String> update(
            @RequestParam Integer id,
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String email,
            @RequestParam(required = false) String user_role,
            @RequestParam(required = false) String authorization) {

        if (authiService.authentication(authorization) == false) {
            return authiService.getError();
        }

        LinkedList<Integer> ids = new LinkedList<Integer>();
        ids.add(id);
        Iterable<User> DIs = userRepository.findAllById(ids);

        Iterator<User> diIterator = DIs.iterator();
        if (!diIterator.hasNext()) {
            return ResponseEntity.status(400).body("\"No DI with this id was found.\"");
        }
        User firstDI = diIterator.next();

        if (name != null && name != "") {
            firstDI.setName(name);
        }
        if (surname != null && surname != "") {
            firstDI.setSurname(surname);
        }
        if (email != null && surname != "") {
            firstDI.setEmail(email);
        }

        if (user_role != null && user_role != "") {
            switch (user_role) {
                case "admin":
                    firstDI.setUserRole(UserRole.fromString("ROLE_ADMIN"));
                    break;
                case "employee":
                    firstDI.setUserRole(UserRole.fromString("ROLE_EMPLOYEE"));
                    break;
                case "hr_employee":
                    firstDI.setUserRole(UserRole.fromString("ROLE_HR_EMPLOYEE"));
                    break;
                case "guest":
                    firstDI.setUserRole(UserRole.fromString("ROLE_GUEST"));
                    break;
                default:
                    return ResponseEntity.status(500).body("\"User role not recognized.\"");
            }
        }

        userRepository.save(firstDI);
        return ResponseEntity.status(200).body(firstDI.toString());
    }

    @PostMapping(path = "/password/change")
    public @ResponseBody ResponseEntity<String> changePassword(
            @RequestParam Integer id,
            @RequestParam String old_password,
            @RequestParam String new_password,
            @RequestParam(required = false) String authorization) {

        if (authiService.authentication(authorization) == false) {
            return authiService.getError();
        }

        return authiService.handleChangePassword(id, old_password, new_password);
    }
}