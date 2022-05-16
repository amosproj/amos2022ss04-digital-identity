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
@RequestMapping(path="/auth")
public class AuthenticationController {
 
    @Autowired
    private UserRepository userRepository;

    // TODO: We need to restrict that only to the admin user
    // TODO: Implement HTTP Status Code
    @PostMapping(path="/signup")
    public @ResponseBody String addNewUser(@RequestParam String name, @RequestParam String surname, @RequestParam String birthday,
            @RequestParam String e_mail, @RequestParam String company, @RequestParam String team, @RequestParam String user_role) {
        
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setBirthday(birthday);
        user.setEmail(e_mail);
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
                return "user role not recognized!";
            }
            
            
        userRepository.save(user);
        return "success";

    }
}