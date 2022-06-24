package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;

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
import org.springframework.web.client.RestClientException;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.shared.samples.CreateConnectionResponseSamples;
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
    @Mock
    private StrongPasswordService strongPasswordService;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        connectionService = new DIConnectionService();
        connectionService.setUserRepository(userRepository);
        connectionService.setLissiApiService(lissiApiService);
        connectionService.setMailService(mailService);
        connectionService.setStrongPasswordService(strongPasswordService);

        defaultMocking();
    }

    void defaultMocking() {
        // lissi.createConnection will always return with "lissiUri"
        ResponseEntity<CreateConnectionResponse> response = new ResponseEntity<>(
                CreateConnectionResponseSamples.getSample(), HttpStatus.CREATED);

        Mockito.when(lissiApiService.createConnectionInvitation(anyString()))
                .thenReturn(response);

        // mailService will always return true
        Mockito.when(mailService.sendInvitation(anyString(), anyString())).thenReturn(true);
        Mockito.when(mailService.sendPassword(anyString(), anyString())).thenReturn(true);

        // Mock: userRepository.findByEmail returns null
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(null));

        // strongPasswordService willl always create password123
        Mockito.when(strongPasswordService.generateSecurePassword(anyInt())).thenReturn("password123");
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
        Mockito.reset(lissiApiService);
        Mockito.reset(mailService);
        Mockito.reset(userRepository);
    }

    /**
     * Test: Create a new user if email is not used
     * 
     * Expected: User should be saved to DB. HTTP.status(201)
     */
    @Test
    void itShouldCreateNewUserOnEmptyDB() {
        // given
        String password = "password123";
        User expected = UserSamples.getSampleUser();
        expected.setPassword(password);
        // strongPasswordService willl always create password123
        Mockito.when(strongPasswordService.generateSecurePassword(anyInt())).thenReturn("password123");

        // when
        ResponseEntity<String> response = connectionService.create(
                expected.getName(),
                expected.getSurname(),
                expected.getEmail(),
                expected.getUserRole().toString());

        // then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        // track calls
        ArgumentCaptor<User> userAgArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userAgArgumentCaptor.capture());

        User captured = userAgArgumentCaptor.getValue();

        assertEquals(expected.getName(), captured.getName());
        assertEquals(expected.getSurname(), captured.getSurname());
        assertEquals(expected.getEmail(), captured.getEmail());
        assertEquals(expected.getUserRole(), captured.getUserRole());
        assertEquals(expected.getPassword(), captured.getPassword());
    }

    /**
     * /** Test: Create a new user if email is not used Expected: Saved User should
     * contain the to DB. HTTP.status(201)
     */
    @Test
    void itShouldSaveTheInvitationUrlWithUserOnEmptyDB() {
        // given
        User user = UserSamples.getSampleUser();
        CreateConnectionResponse ccr = CreateConnectionResponseSamples.getSample();
        ResponseEntity<CreateConnectionResponse> responseEntity = new ResponseEntity<CreateConnectionResponse>(ccr,
                HttpStatus.CREATED);
        // Mock: overriding
        Mockito.when(lissiApiService.createConnectionInvitation(anyString())).thenReturn(responseEntity);

        // when
        ResponseEntity<String> response = connectionService.create(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
        // track calls
        ArgumentCaptor<User> userAgArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userAgArgumentCaptor.capture());

        User captured = userAgArgumentCaptor.getValue();

        assertEquals(ccr.getInvitationUrl(), captured.getInvitationUrl());
    }

    /**
     * Test: Create a new user with an email which is already present in a database
     * mail comparison ignoring case Expected: User should not be saved to DB.
     * Returns HTTP.status(500)
     */
    @Test
    void itShouldNotCreateUserWithEqualMailsOnDB() {
        // given
        User user = UserSamples.getSampleUser();
        // Mocking: override userRepository.findByEmail
        Mockito.when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        // when
        ResponseEntity<String> response = connectionService.create(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getUserRole().toString());

        assertEquals(HttpStatus.valueOf(500), response.getStatusCode());

        // verify(lissiApiService.createConnectionInvitation(anyString())).
        verify(lissiApiService, never()).createConnectionInvitation(anyString());

    }

    /**
     * Test: Create a new user a new user within an empty database. Mail of the user
     * is not taken. Expected: calls lissiApiService.createConnectionInvitation with
     * email as param
     */
    @Test
    void itShouldCreateNewUserOnLissy() {
        User expected = UserSamples.getSampleUser();

        // when
        ResponseEntity<String> response = connectionService.create(expected.getName(), expected.getSurname(),
                expected.getEmail(), expected.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
        // track calls
        ArgumentCaptor<String> userAgArgumentCaptor = ArgumentCaptor.forClass(String.class);
        verify(lissiApiService).createConnectionInvitation(userAgArgumentCaptor.capture());

        String captured = userAgArgumentCaptor.getValue();

        assertEquals(expected.getEmail(), captured);
    }

    /**
     * Test: Create a new user a new user. Mail of the use is not taken. Expected:
     * calls mailService. with valid params
     */
    @Test
    void itShouldSendInvitationEmailAfterCreate() {
        // given
        User expected = UserSamples.getSampleUser();
        CreateConnectionResponse ccr = CreateConnectionResponseSamples.getSample();
        ResponseEntity<CreateConnectionResponse> responseEntity = new ResponseEntity<CreateConnectionResponse>(ccr,
                HttpStatus.CREATED);
        // Mock: overriding
        Mockito.when(lissiApiService.createConnectionInvitation(anyString())).thenReturn(responseEntity);

        // when
        ResponseEntity<String> response = connectionService.create(
                expected.getName(),
                expected.getSurname(),
                expected.getEmail(),
                expected.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
        // track calls
        ArgumentCaptor<String> userArgumentCaptor1 = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> userArgumentCaptor2 = ArgumentCaptor.forClass(String.class);
        verify(mailService).sendInvitation(userArgumentCaptor1.capture(), userArgumentCaptor2.capture());

        String captured1 = userArgumentCaptor1.getValue();
        String captured2 = userArgumentCaptor2.getValue();

        assertEquals(expected.getEmail(), captured1);
        assertEquals(ccr.getInvitationUrl(), captured2);
    }

    /**
     * Test: Create a new user a new user within an empty database. Mail of the user
     * is not taken. Expected: User should not be saved to DB. Returns
     * HTTP.status(500)
     */
    @Test
    void itShouldNotCreateNewUserOnDatabaseIfLissiCreateConnectionFails() {
        // given
        User user = UserSamples.getSampleUser();
        // Mock: overriding
        Mockito.when(lissiApiService.createConnectionInvitation(anyString()))
                .thenThrow(new RestClientException("Error for Testing"));

        // when
        ResponseEntity<String> response = connectionService.create(user.getName(), user.getSurname(), user.getEmail(),
                user.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.INTERNAL_SERVER_ERROR);
        verify(mailService, never()).sendInvitation(anyString(), anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    /**
     * Test: Create a new user within a populated database. Mail of the user is not
     * taken but sending the invitation to the user failed. Expected: User should
     * not be saved to DB. Returns HTTP.status(500)
     */
    @Test
    void itShouldRemoveNewUserOnDatabaseIfSendingMailFails() {
        // given
        User expected = UserSamples.getSampleUser();
        // Mock: overriding
        Mockito.when(mailService.sendInvitation(anyString(), anyString())).thenReturn(false);

        // when
        ResponseEntity<String> response = connectionService.create(
                expected.getName(),
                expected.getSurname(),
                expected.getEmail(),
                expected.getUserRole().toString());

        // then
        assertEquals(response.getStatusCode(), HttpStatus.INTERNAL_SERVER_ERROR);
        // verify(userRepository, times(1)).delete();
        verify(userRepository, times(1)).delete(any(User.class));

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).delete(userArgumentCaptor.capture());

        User actual = userArgumentCaptor.getValue();
        assertEquals(expected.getEmail(), actual.getEmail());
    }

    // TODO: delete
    private User getDummyUser() {
        User user = new User();
        user.setId(1);
        user.setName("Test");
        user.setSurname("Test");
        user.setEmail("test@test.test");
        user.setUserRole(UserRole.EMPLOYEE);
        return user;
    }

    @Test
    public void testUpdateGeneric() {
        // Arrange
        User expected = getDummyUser();
        Mockito.when(userRepository.findById(anyInt())).thenReturn(Optional.of(expected));

        // Act
        ResponseEntity<String> responseEntity = connectionService.update(1, "TestChanged", "TestChanged",
                "test@test.test", "hr_employee");

        // Assert
        User changedUser = getDummyUser();
        changedUser.setName("TestChanged");
        changedUser.setSurname("TestChanged");
        changedUser.setUserRole(UserRole.HR_EMPLOYEE);

        ArgumentCaptor<User> argument = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(argument.capture());
        User actual = argument.getValue();

        assertEquals(changedUser.getId(), actual.getId());
        assertEquals(changedUser.getName(), actual.getName());
        assertEquals(changedUser.getSurname(), actual.getSurname());
        assertEquals(changedUser.getEmail(), actual.getEmail());
        assertEquals(changedUser.getUserRole(), actual.getUserRole());

        assertEquals(HttpStatus.valueOf(200), responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateWrongID() {
        // Arrange
        Mockito.when(userRepository.findById(anyInt())).thenReturn(Optional.ofNullable(null));

        // Act
        ResponseEntity<String> responseEntity = connectionService.update(1, "TestChanged", "TestChanged",
                "test@test.test", "hr_employee");

        // Assert
        verify(userRepository, never()).save(any(User.class));
        assertEquals(HttpStatus.valueOf(400), responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateWrongRole() {
        // Arrange
        User expected = getDummyUser();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(expected));

        // Act
        ResponseEntity<String> responseEntity = connectionService.update(1, "TestChanged", "TestChanged",
                "test@test.test", "EEEEEEEEEEEEEEEEEEEEEE");

        // Assert
        verify(userRepository, never()).save(any(User.class));
        assertEquals(HttpStatus.valueOf(400), responseEntity.getStatusCode());
    }

    @Test
    public void testGetConnectionByIdGeneric() {
        // Arrange
        User expected = getDummyUser();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(expected));

        // Act
        User result = connectionService.getConnectionById(1);

        // Assert
        assertEquals(expected, result);
    }

    @Test
    public void testGetConnectionByIdWrong() {
        // Arrange
        User expected = null;
        User user = getDummyUser();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(user));

        // Act
        User result = connectionService.getConnectionById(-1);

        // Assert
        assertEquals(expected, result);
    }

    /**
     * A User should be removed from the database if removed is called for a present
     * user
     * It should return 200
     */
    @Test
    void removeById_itShouldSuccessfullyRemoveExistingUser() {
        // -- given --
        User sample = UserSamples.getSampleUser();
        // mock: user in DB
        Mockito.when(
                userRepository.findById(anyInt())).thenReturn(Optional.of(sample));
        // Mockito.when

        // -- when --
        ResponseEntity<String> response = connectionService.remove(1);

        // -- then --
        assertEquals(HttpStatus.valueOf(200), response.getStatusCode());

        // capture db.delete
        ArgumentCaptor<User> userAgArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).delete(userAgArgumentCaptor.capture());

        User captured = userAgArgumentCaptor.getValue();
        assertEquals(sample, captured);
        assertEquals(sample.getEmail(), captured.getEmail());

        // capture lissi.delete
        ArgumentCaptor<String> connectionIdCapture = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Boolean> boolcaptor1 = ArgumentCaptor.forClass(Boolean.class);
        ArgumentCaptor<Boolean> boolcaptor2 = ArgumentCaptor.forClass(Boolean.class);
        verify(lissiApiService).removeConnection(connectionIdCapture.capture(), boolcaptor1.capture(),
                boolcaptor2.capture());

        String capturedConnectionID = connectionIdCapture.getValue();
        assertEquals(sample.getConnectionId(), capturedConnectionID);
        assertEquals(true, boolcaptor1.getValue());
        assertEquals(true, boolcaptor2.getValue());

    }

    /**
     * No User should be removed from the database if removed is called for a non
     * existing user
     * It should return 200
     */
    @Test
    void removeById_itShouldReturnSuccesIfRemovedUserDoesNotExist() {
        // -- given --
        // mocked behavior: user is not present

        // -- when --
        ResponseEntity<String> response = connectionService.remove(1);

        // -- then --
        assertEquals(HttpStatus.valueOf(200), response.getStatusCode());
        verify(userRepository, never()).delete(any(User.class));
        verify(lissiApiService, never()).removeConnection(anyString(), anyBoolean(), anyBoolean());
    }

    /**
     * A User should be removed from the database if removed is called for a present
     * user
     * It should return 200
     */
    @Test
    void removeUser_itShouldSuccessfullyRemoveExistingUser() {
        // -- given --
        User sample = UserSamples.getSampleUser();

        // -- when --
        ResponseEntity<String> response = connectionService.remove(sample);

        // -- then --
        assertEquals(HttpStatus.valueOf(200), response.getStatusCode());

        // capture db.delete
        ArgumentCaptor<User> userAgArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).delete(userAgArgumentCaptor.capture());

        User captured = userAgArgumentCaptor.getValue();
        assertEquals(sample, captured);
        assertEquals(sample.getEmail(), captured.getEmail());

        // capture lissi.delete
        ArgumentCaptor<String> connectionIdCapture = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Boolean> boolcaptor1 = ArgumentCaptor.forClass(Boolean.class);
        ArgumentCaptor<Boolean> boolcaptor2 = ArgumentCaptor.forClass(Boolean.class);
        verify(lissiApiService).removeConnection(connectionIdCapture.capture(), boolcaptor1.capture(),
                boolcaptor2.capture());

        String capturedConnectionID = connectionIdCapture.getValue();
        assertEquals(sample.getConnectionId(), capturedConnectionID);
        assertEquals(true, boolcaptor1.getValue());
        assertEquals(true, boolcaptor2.getValue());

    }

    /**
     * No User should be removed from the database if removed is called for a non
     * existing user
     * It should return 200
     */
    @Test
    void removeUser_itShouldReturnSuccesIfRemovedUserDoesNotExist() {
        // -- given --
        User sample = UserSamples.getSampleUser();
        // mocked behavior: user is not present

        // -- when --
        ResponseEntity<String> response = connectionService.remove(sample);

        // -- then --
        assertEquals(HttpStatus.valueOf(200), response.getStatusCode());
    }
}