package didentity.amos.digitalIdentity.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;


public class ConnectionControllerTests {


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

    @Test
    void testAuthentification_withAdmin_shouldBeAccepted() {
        // Arrange
        boolean expected = true;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "admin";

        // Act
        boolean result = connectionController.authentification(authorization);
        
        //Assert
        assertEquals(expected, result);
    }

    @Test
    void testAuthentification_withoutFalseAuthorization_shouldBeDenied() {
        // Arrange
        boolean expected = false;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "hacker";

        // Act
        boolean result = connectionController.authentification(authorization);
        
        //Assert
        assertEquals(expected, result);
    }

    @Test
    void testAuthentification_withEmptyAuthorization_shouldBeDenied() {
        // Arrange
        boolean expected = false;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "";

        // Act
        boolean result = connectionController.authentification(authorization);
        
        //Assert
        assertEquals(expected, result);
    }
    
    @Test
    void testUnavailable() {
        // Arrange
        boolean expected = true;
        ConnectionController connectionController = new ConnectionController();

        // Act
        boolean result = connectionController.unavailable();
        
        //Assert
        assertEquals(expected, result);
    }
    
}
