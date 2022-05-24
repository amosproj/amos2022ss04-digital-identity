package didentity.amos.digitalIdentity.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;


public class AuthentificationControllerTests {

    private AuthenticationController authenticationController = new AuthenticationController();

    // @Autowired
    private static UserRepository userRepository;

    private static User user = new User();

    @BeforeAll
    public static void setup() {
        String email = "test@test.de";
        String password = "password";

        user.setEmail(email);
        user.setPassword(password);

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
    public static void teardown() {
        // userRepository.delete(user);
    }
    

}
