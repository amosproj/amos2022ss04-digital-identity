package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.shared.samples.UserSamples;

@DataJpaTest
public class DIConnectionServiceTest {

    private DIConnectionService connectionService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private LissiApiService lissiApiService;
    @Mock
    private MailService mailService;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        connectionService = new DIConnectionService();
        connectionService.setUserRepository(userRepository);
        connectionService.setLissiApiService(lissiApiService);
        connectionService.setMailService(mailService);
    }

    @BeforeEach
    void mocking() {
        // lissi.createConnection will always return with "lissiUri"
        Mockito.when(lissiApiService.createConnectionInvitation(anyString())).thenReturn("lissiUri");

        // mailService will always return success

        Mockito.when(mailService.sendInvitation(anyString(), anyString()))
                .thenReturn("success");

    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    /**
     * /**
     * Test: Create a new user if email is not used
     * Expected: User should be saved to DB. HTTP.status(201)
     */
    @Test
    void itShouldCreateNewUserOnEmptyDB() {
        // given
        User expected = UserSamples.getSampleUser();
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(null));

        // when
        ResponseEntity<String> response = connectionService.create(
                expected.getName(),
                expected.getSurname(),
                expected.getEmail(),
                expected.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
        // track calls
        ArgumentCaptor<User> userAgArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userAgArgumentCaptor.capture());

        User captured = userAgArgumentCaptor.getValue();

        assertEquals(expected.getEmail(), captured.getEmail());
    }

    /**
     * Test: Create a new user with an email which is already present in a database
     * mail comparison ignoring case
     * Expected: User should not be saved to DB. Returns HTTP.status(500)
     */
    @Test
    void itShouldNotCreateUserWithEqualMailsOnDB() {
        // given
        User user = UserSamples.getSampleUser();
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        // when
        ResponseEntity<String> response = connectionService.create(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getUserRole().toString());

        assertEquals(response.getStatusCode(), HttpStatus.valueOf(500));

        // verify(lissiApiService.createConnectionInvitation(anyString())).
        verify(lissiApiService, never()).createConnectionInvitation(anyString());

    }

    /**
     * Test: Create a new user a new user within an empty database. Mail of the user
     * is not taken.
     * Expected: calls lissiApiService.createConnectionInvitation with valid params
     */
    @Test
    void itShouldCreateNewUserOnLissy() {

    }

    /**
     * Test: Create a new user a new user within an empty database. Mail of the user
     * is not taken.
     * Expected: calls lissiApiService.createConnectionInvitation with valid params
     */
    @Test
    void itShouldSendInvitationEmailAfterCreate() {

    }

    /**
     * Test: Create a new user a new user within an empty database. Mail of the user
     * is not taken.
     * Expected: User should not be saved to DB. Returns HTTP.status(500)
     */
    @Test
    void itShouldNotCreateNewUserOnDatabaseIfLissiCreateConnectionFails() {

    }

    /**
     * Test: Create a new user within a populated database. Mail of the user is not
     * taken.
     * Expected: User should not be saved to DB. Returns HTTP.status(500)
     */
    @Test
    void itShouldNotCreateNewUserOnDatabaseIfSendingMailFails() {

    }

    /*
     * ---
     * Mocking for create
     * ----
     * userRepository.findByEmail
     * userRepository.save
     *
     * lissiApiService.createConnectionInvitation
     * 
     * mailService.sendInvitation
     */

}
