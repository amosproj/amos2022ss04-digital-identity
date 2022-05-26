package didentity.amos.digitalIdentity.controller;

import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.enums.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    // TODO: We need to restrict that only to the admin user
    // TODO: Implement HTTP Status Code
    @PostMapping(path="/register")
    public @ResponseBody String register(@RequestParam String name, @RequestParam String surname, @RequestParam String birthday,
            @RequestParam String email, @RequestParam String company, @RequestParam String team, @RequestParam String user_role) {
        
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
    public @ResponseBody String update(@RequestParam String name, @RequestParam String surname, @RequestParam String birthday,
    @RequestParam String email, @RequestParam String company, @RequestParam String team, @RequestParam String user_role) {
        Iterable<User> users = userRepository.findAll();
        
        // TODO Jannik: findAll() ist ziemlich inperformant; Ich wusste leider nicht wie man e_mail und password direkt im Repository abfragen kann
        for (User userDatabase : users) {
            if(userDatabase.getEmail() == email) {

                User user = userDatabase;
                user.setName(name);
                user.setSurname(surname);
                user.setBirthday(birthday);
                user.setEmail(email);
                user.setCompany(company);
                user.setTeam(team);

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
            return "\"success\"";
            }
        }
        return "\"email not found\"";
    }


}