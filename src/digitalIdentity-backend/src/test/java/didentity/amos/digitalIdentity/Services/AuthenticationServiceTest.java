package didentity.amos.digitalIdentity.Services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import didentity.amos.digitalIdentity.controller.ConnectionController;
import didentity.amos.digitalIdentity.services.AuthenticationService;


public class AuthenticationServiceTest {
	
    private AuthenticationService authService;

    @Test
    void testAuthentication() {
        String token = "";
        boolean response = authService.authentication("");
        assert(response == false);
    }

    @Test
    void testAuthentification_withPassing_shouldBeAccepted() {
        // Arrange
        boolean expected = true;
       // AuthentificationService authService;
        String authorization = "passing";

        // Act
       // boolean result = connectionController.authentification(authorization);

        //Assert
       // assertEquals(expected, result);
    }
}