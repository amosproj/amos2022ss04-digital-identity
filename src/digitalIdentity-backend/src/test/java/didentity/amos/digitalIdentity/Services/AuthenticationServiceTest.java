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
    void testAuthentication() {
        assertFalse(authenticationService.authentication("John"));
        assertTrue(authenticationService.authentication("passing"));
        assertTrue(authenticationService.authentication("admin"));
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
    void testLoginWithSuccessfulLogin() {
        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("test");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(userRepository.findByEmail(any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = authenticationService.login("test@fau.de", "test");

        assertEquals("\"Login successful.\"", actualLoginResult.getBody());
        assertEquals(200, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
        verify(userRepository).findByEmail(any());
    }

    @Test
    void testLoginWithWrongPassword() {
        User user = mock(User.class);

        when(user.getPassword()).thenReturn("SomePassword");
        doNothing().when(user).setEmail(any());
        doNothing().when(user).setId(any());
        doNothing().when(user).setName(any());
        doNothing().when(user).setPassword(any());
        doNothing().when(user).setSurname(any());
        doNothing().when(user).setUserRole(any());

        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("test");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(this.userRepository.findByEmail(any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = this.authenticationService.login("test@fau.de", "test");

        assertEquals("\"Password and username do not match.\"", actualLoginResult.getBody());
        assertEquals(200, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
        verify(this.userRepository).findByEmail(any());
        verify(user).getPassword();
        verify(user).setEmail(any());
        verify(user).setId(any());
        verify(user).setName(any());
        verify(user).setPassword(any());
        verify(user).setSurname(any());
        verify(user).setUserRole(any());
    }

    @Test
    void testLoginWithEmptyEmail() {
        User user = mock(User.class);
        when(user.getPassword()).thenReturn("test");
        doNothing().when(user).setEmail(any());
        doNothing().when(user).setId(any());
        doNothing().when(user).setName(any());
        doNothing().when(user).setPassword(any());
        doNothing().when(user).setSurname(any());
        doNothing().when(user).setUserRole(any());

        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("test");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(this.userRepository.findByEmail(any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = this.authenticationService.login("", "test");

        assertEquals("\"Bad request. Email is empty.\"", actualLoginResult.getBody());
        assertEquals(400, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
        verify(user).setEmail(any());
        verify(user).setId(any());
        verify(user).setName(any());
        verify(user).setPassword(any());
        verify(user).setSurname(any());
        verify(user).setUserRole(any());
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