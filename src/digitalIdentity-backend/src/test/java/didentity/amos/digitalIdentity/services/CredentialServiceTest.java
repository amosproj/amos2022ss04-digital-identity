package didentity.amos.digitalIdentity.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;

@DataJpaTest
public class CredentialServiceTest {

    private CredentialService credentialService;

    @Mock
    private LissiApiService lissiApiService;

    private AutoCloseable autoCloseable;
    
    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        credentialService = new CredentialService();
        credentialService.setLissiApiService(lissiApiService);
        
        ResponseEntity<String> responseEntity = new ResponseEntity<String>("anyString",
                HttpStatus.CREATED);
        Mockito.when(lissiApiService.issueCredential(anyString(), anyString(), anyString()))
                .thenReturn(responseEntity);
    }

    @Test
    public void testIssueCredentialGeneric() {
        // Arrange

        // Act
        ResponseEntity<String> responseEntity = credentialService.issue("connectionId", "credentialDefinitionId", "attributes");

        // Assert
        verify(lissiApiService).issueCredential(anyString(), anyString(), anyString());
        assertEquals(HttpStatus.valueOf(201), responseEntity.getStatusCode());
    }

    @Test
    public void testIssueCredentialLissiApiNotWorking() {
        // Arrange
        Mockito.when(lissiApiService.issueCredential(anyString(), anyString(), anyString()))
                .thenReturn(null);

        // Act
        ResponseEntity<String> responseEntity = credentialService.issue("connectionId", "credentialDefinitionId", "attributes");

        // Assert
        verify(lissiApiService).issueCredential(anyString(), anyString(), anyString());
        assertEquals(HttpStatus.valueOf(500), responseEntity.getStatusCode());
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
        Mockito.reset(lissiApiService);
    }
}
