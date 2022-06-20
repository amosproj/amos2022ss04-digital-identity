package didentity.amos.digitalIdentity.services;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;


import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

import didentity.amos.digitalIdentity.controller.ConnectionController;
import didentity.amos.digitalIdentity.services.AuthenticationService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ContextConfiguration(classes = {AuthenticationService.class})
@ExtendWith(SpringExtension.class)
public class AuthenticationServiceTest {
    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    ResponseEntity<String> response401;
    ResponseEntity<String> response403;
    ResponseEntity<String> lastError;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationService();
        response401 = ResponseEntity.status(401).body("Unauthorized, missing authentication.");
        response403 = ResponseEntity.status(403).body("Forbidden.");
        lastError = null;
    }

    @Test
    void testAuthentication() {
        assertFalse(authenticationService.authentication("John"));
        assertTrue(authenticationService.authentication("passing"));
        assertTrue(authenticationService.authentication("admin"));
    }

    @Test
    void testGetError() {
        assertNull((new AuthenticationService()).getError());
    }

    @Test
    void testAuthentification_withPassing_shouldBeAccepted() {
        // Arrange
        //boolean expected = true;
       // AuthentificationService authService;
        String authorization = "passing";

        // Act
       // boolean result = connectionController.authentification(authorization);

        //Assert
       // assertEquals(expected, result);
    }

    @Test
    void authentication() {
    }

    @Test
    void login() {
    }
}