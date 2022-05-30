package didentity.amos.digitalIdentity.controller;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Controller
public class AuthentificationControllerTests {

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private UserRepository userRepository;

    private static User user = new User();

    @BeforeAll
    public void setup() {
        String email = "test@test.de";
        String password = "password";

        user.setEmail(email);
        user.setPassword(password);
        user.setBirthday("01.01.2000");
        user.setCompany("test");
        user.setId(99);
        user.setName("test");
        user.setSurname("test");
        user.setTeam("team");
        user.setUserRole(UserRole.EMPLOYEE);

        userRepository.save(user);
    }
    
    @Test
    public void testLogin(){
        // Arrange
        String email = "test@test.de";
        String password = "password";

        String expected = "\"success\"";

        // Act
        String result = authenticationController.login(email, password);
        
        // Assert
        Assertions.assertEquals(expected, result);
    }

    @AfterAll
    public void teardown() {
        // userRepository.delete(user);
    }
    
}
