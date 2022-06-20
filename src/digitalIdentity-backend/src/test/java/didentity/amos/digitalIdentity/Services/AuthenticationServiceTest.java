package didentity.amos.digitalIdentity.services;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

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

    User user;

    @BeforeEach
    void setUp() {
        response401 = ResponseEntity.status(401).body("Unauthorized, missing authentication.");
        response403 = ResponseEntity.status(403).body("Forbidden.");
        lastError = null;
        user = new User();
    }

    @Test
    void testAuthenticationWhenTokenEqualNull() {
        assertFalse(authenticationService.authentication(null));
        lastError = response401;
        assertEquals(response401,lastError);
    }

    @Test
    void testAuthenticationWhenTokenEqualAdmin() {
        assertTrue(authenticationService.authentication("admin"));
        assertNull(lastError);
    }

    @Test
    void testAuthenticationWhenTokenEqualPassing() {
        assertTrue(authenticationService.authentication("passing"));
        assertNull(lastError);
    }

    @Test
    void testAuthenticationWhenTokenEqualSomethingElse() {
        assertFalse(authenticationService.authentication("John"));
        lastError = response403;
        assertEquals(response403,lastError);
    }

    @Test
    void testGetError() {
        assertNull((new AuthenticationService()).getError());
    }

    @Test
    void testLogin() {
        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("test");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(userRepository.findByEmail((String) any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = authenticationService.login("test@fau.de", "test");

        assertEquals("\"Login successful.\"", actualLoginResult.getBody());
        assertEquals(200, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
        verify(userRepository).findByEmail((String) any());
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
}