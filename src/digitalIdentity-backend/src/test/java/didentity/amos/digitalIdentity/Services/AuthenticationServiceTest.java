package didentity.amos.digitalIdentity.services;

import org.junit.jupiter.api.Test;

import didentity.amos.digitalIdentity.controller.ConnectionController;
import didentity.amos.digitalIdentity.services.AuthenticationService;

public class AuthenticationServiceTest {
    private AuthenticationService authService;

    @Test
    void testAuthentication() {
        String token = "";
        boolean response = authService.authentication("");
        //assertEquals(false, response);
    }

    @Test
    void testAuthentification_withPassing_shouldBeAccepted() {
        // Arrange
        boolean expected = true;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "passing";

        // Act
        boolean result = connectionController.authentification(authorization);

        //Assert
        assertEquals(expected, result);
    }
}