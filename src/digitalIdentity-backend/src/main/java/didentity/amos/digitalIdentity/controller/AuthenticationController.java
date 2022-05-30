package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.repository.UserRepository;
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

    // TODO: We need to restrict that only to the admin user
    // TODO: Implement HTTP Status Code
    @PostMapping(path="/register")
    public @ResponseBody String register(@RequestParam String name, @RequestParam String surname, @RequestParam(required=false) String birthday,
            @RequestParam String email, @RequestParam(required=false) String company, @RequestParam(required=false) String team, @RequestParam(required=false) String user_role) {
        
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setBirthday(birthday);
        user.setEmail(email);
        user.setCompany(company);
        user.setTeam(team);
        user.setPassword("test");

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
                return "\"user role not recognized!\"";
            }
            
        userRepository.save(user);

        mailService.sendInvitation(email, "https://www.google.com/");

        return "\"success\"";

    }

    @PostMapping(path="/login")
    public @ResponseBody String login(@RequestParam String email, @RequestParam String password) {  
            
        // TODO Jannik: findAll() ist ziemlich inperformant; Ich wusste leider nicht wie man e_mail und password direkt im Repository abfragen kann
        Iterable<User> users = userRepository.findAll();
        for (User user : users) {
            if(user.getEmail().equals(email) && user.getPassword().equals(password)) {
            return "\"success\"";
            }
        }
        return "\"password and username do not match\"";

    }


    @PostMapping(path="/update")
    public @ResponseBody ResponseEntity<String> update(@RequestParam Integer id, @RequestParam String name, @RequestParam String surname, @RequestParam(required=false) String birthday,
    @RequestParam String email, @RequestParam(required=false) String company, @RequestParam(required=false) String team, @RequestParam(required=false) String user_role) {
        LinkedList<Integer> ids = new LinkedList<Integer>();
        ids.add(id);
        Iterable<User> DIs = userRepository.findAllById(ids);
        
        Iterator<User> diIterator = DIs.iterator();
        if (!diIterator.hasNext()) {
            return ResponseEntity.status(500).body("\"No DI with this id was found!\"");
        }
        User firstDI = diIterator.next();

        if (name != null && name != "")         { firstDI.setName(name); }
        if (surname != null && surname != "")   { firstDI.setSurname(surname); }
        if (email != null && surname != "")     { firstDI.setEmail(email); }
        if (birthday != null)                   { firstDI.setBirthday(birthday); } 
        if (company != null)                    { firstDI.setCompany(company); }
        if (team != null)                       { firstDI.setTeam(team); }

        if (user_role != null && user_role != ""){
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
                    return ResponseEntity.status(500).body("\"No DI with this id was found!\""); //TODO change status code
            }
        }
        
        userRepository.save(firstDI);
        return ResponseEntity.status(200).body(firstDI.toString());
    }


}