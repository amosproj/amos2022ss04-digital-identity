package didentity.amos.digitalIdentity.services;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.shared.samples.UserSamples;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ContextConfiguration(classes = { AuthenticationService.class })
@ExtendWith(SpringExtension.class)
public class AuthenticationServiceTest {
    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private StrongPasswordService strongPasswordService;
    @MockBean
    private MailService mailService;

    ResponseEntity<String> response401;
    ResponseEntity<String> response403;
    ResponseEntity<String> lastError;

    String[] validTokens = { "passing", "admin" };
    String[] invalidTokens = { "John", "test" };
    User user;

    @BeforeEach
    void setUp() {
        response401 = ResponseEntity.status(401).body("Unauthorized, missing authentication.");
        response403 = ResponseEntity.status(403).body("Forbidden.");
        lastError = null;

        user = new User();
    }

    @Test
    void testAuthenticationForValidToken() {
        for (String validToken : validTokens)
            assertTrue(authenticationService.authentication(validToken));
    }

    @Test
    void testAuthenticationForInvalidToken() {
        for (String invalidToken : invalidTokens)
            assertFalse(authenticationService.authentication(invalidToken));
    }

    @Test
    void testAuthenticationWhenTokenEqualNull() {
        assertFalse(authenticationService.authentication(null));
        lastError = response401;
        assertEquals(response401, lastError);
    }

    @Test
    void testAuthenticationWhenTokenEqualAdminOrPassing() {

        for (String validToken : validTokens) {
            assertTrue(authenticationService.authentication(validToken));
            assertNull(lastError);
        }
    }

    @Test
    void testAuthenticationWhenTokenEqualSomethingElse() {
        for (String invalidToken : invalidTokens) {
            assertFalse(authenticationService.authentication(invalidToken));
            lastError = response403;
            assertEquals(response403, lastError);
        }
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
    }

    @Test
    void testLoginWithWrongPassword() {
        User user = mock(User.class);

        when(user.getPassword()).thenReturn("SomePassword");

        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("SomePassword");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(this.userRepository.findByEmail(any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = this.authenticationService.login("test@fau.de", "test");

        assertEquals("\"Password and email do not match.\"", actualLoginResult.getBody());
        assertEquals(200, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
    }

    @Test
    void testLoginWithEmptyEmail() {
        User user = mock(User.class);
        when(user.getPassword()).thenReturn("test");

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
    }

    @Test
    void testLoginWithEmptyPassword() {
        User user = mock(User.class);
        when(user.getPassword()).thenReturn("test");

        user.setEmail("test@fau.de");
        user.setId(1);
        user.setName("Name0");
        user.setPassword("test");
        user.setSurname("Surname0");
        user.setUserRole(UserRole.ADMIN);

        Optional<User> ofResult = Optional.of(user);
        when(this.userRepository.findByEmail(any())).thenReturn(ofResult);
        ResponseEntity<String> actualLoginResult = this.authenticationService.login("test@fau.de", "");

        assertEquals("\"Bad request. Password is empty.\"", actualLoginResult.getBody());
        assertEquals(400, actualLoginResult.getStatusCodeValue());
        assertTrue(actualLoginResult.getHeaders().isEmpty());
    }

    @Test
    void handleForgotPassword_shouldReturn400OnEmptyEmail() {
        // -- given --
        // -- when --
        ResponseEntity<String> response = authenticationService.handleForgotPassword("");

        // -- then --
        assertEquals(HttpStatus.valueOf(400), response.getStatusCode());
    }

    @Test
    void handleForgotPassword_shouldReturn400OnNullEmail() {
        // -- given --
        // -- when --
        ResponseEntity<String> response = authenticationService.handleForgotPassword(null);

        // -- then --
        assertEquals(HttpStatus.valueOf(400), response.getStatusCode());
    }

    @Test
    void handleForgotPassword_shouldReturn500OnUnknowEmail() {
        // -- given --
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(null));
        // -- when --
        ResponseEntity<String> response = authenticationService.handleForgotPassword("meineEmail@test.org");

        // -- then --
        assertEquals(HttpStatus.valueOf(500), response.getStatusCode());
    }

    // TODO
    @Test
    void handleForgotPassword_shouldResetPasswordAndSendMail_Return200() {
        // given
        User user = UserSamples.getSampleUser();
        String pass = "secure passwort";
        String email = "email@test.org";

        Mockito.when(strongPasswordService.generateSecurePassword(anyInt())).thenReturn(pass);
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        // Mockito.when(userRepository.save(any(User.class)));
        Mockito.when(mailService.sendNewPassword(anyString(), anyString())).thenReturn(true);

        // when
        ResponseEntity<String> response = authenticationService.handleForgotPassword(email);

        // -- then --
        assertEquals(HttpStatus.valueOf(200), response.getStatusCode());

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        ArgumentCaptor<String> emailCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> passwordCaptor = ArgumentCaptor.forClass(String.class);

        verify(userRepository).save(userArgumentCaptor.capture());
        verify(mailService).sendNewPassword(emailCaptor.capture(), passwordCaptor.capture());

        assertEquals(pass, userArgumentCaptor.getValue().getPassword());
        assertEquals(email, emailCaptor.getValue());
        assertEquals(pass, passwordCaptor.getValue());

    }

    // TODO
    @Test
    void handleForgotPassword_shouldReturn500OnMailserviceFail() {
        // given
        User user = UserSamples.getSampleUser();
        String pass = "secure passwort";
        String email = "email@test.org";

        Mockito.when(strongPasswordService.generateSecurePassword(anyInt())).thenReturn(pass);
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        // Mockito.when(userRepository.save(any(User.class)));
        Mockito.when(mailService.sendNewPassword(anyString(), anyString())).thenReturn(false);

        // when
        ResponseEntity<String> response = authenticationService.handleForgotPassword(email);

        // -- then --
        assertEquals(HttpStatus.valueOf(500), response.getStatusCode());

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        ArgumentCaptor<String> emailCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> passwordCaptor = ArgumentCaptor.forClass(String.class);

        verify(userRepository, times(2)).save(userArgumentCaptor.capture());
        verify(mailService).sendNewPassword(emailCaptor.capture(), passwordCaptor.capture());

        User actual = userArgumentCaptor.getAllValues().get(1); // 0 and 1 should not matter

        assertEquals(user.getPassword(), actual.getPassword());
        assertEquals(email, emailCaptor.getValue());
        assertEquals(pass, passwordCaptor.getValue());
    }

}