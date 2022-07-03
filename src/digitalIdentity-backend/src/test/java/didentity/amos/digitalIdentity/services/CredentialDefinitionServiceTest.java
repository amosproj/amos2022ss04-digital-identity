package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@DataJpaTest
public class CredentialDefinitionServiceTest {

    private CredentialDefinitionService credentialDefinitionService;

    @Mock
    private LissiApiService lissiApiServiceMock;

    @Mock
    private ResourceService resourceServiceMock;

    private AutoCloseable autoCloseable;

    /*

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);

        credentialDefinitionService = new CredentialDefinitionService();
        credentialDefinitionService.setLissiApiService(lissiApiServiceMock);
        credentialDefinitionService.setResourceService(resourceServiceMock);
    }

    @Test
    void testCreate_withValidResponseOfLissiApiService_shouldCreateCredentialAndReturn201() {
        // Arrange
        this.intallLissiApiServiceMock_createCredentialDefinition();
        this.intallRessourceServiceMock_getDummyPng();

        String alias = "test";
        String comment = "test";
        String schemaId = "test";
        String revocable = "true";

        String expected = "Succesfully created new credential definition.";
        HttpStatus httpStatusExpected = HttpStatus.CREATED;

        // Act
        ResponseEntity<String> response = credentialDefinitionService.create(alias, comment, schemaId, revocable);
        String responseAsString = response.getBody();
        HttpStatus httpStatus = response.getStatusCode();

        // Assert
        assertEquals(expected, responseAsString);
        assertEquals(httpStatusExpected, httpStatus);
    }

    @Test
    void testCreate_withCreateCredentialDefinitionReturnNull_shouldNotCreateCredentialAndReturn500() {
        // Arrange
        this.intallRessourceServiceMock_getDummyPng();

        Mockito.when(lissiApiServiceMock.createCredentialDefinition(anyString(), anyString(), anyString(), anyString(),
                any(), anyString())).thenReturn(null);

        String alias = "test";
        String comment = "test";
        String schemaId = "test";
        String revocable = "true";

        String expected = "Could not create a new credential.";
        HttpStatus httpStatusExpected = HttpStatus.INTERNAL_SERVER_ERROR;

        // Act
        ResponseEntity<String> response = credentialDefinitionService.create(alias, comment, schemaId, revocable);
        String responseAsString = response.getBody();
        HttpStatus httpStatus = response.getStatusCode();

        // Assert
        assertEquals(expected, responseAsString);
        assertEquals(httpStatusExpected, httpStatus);
    }

    @Test
    void testCreate_WithMissingFile_ShouldNotFindFileAndReturn500() {
        // Arrange
        this.intallLissiApiServiceMock_createCredentialDefinition();
        Mockito.when(resourceServiceMock.getDummyPng()).thenReturn(null);

        String alias = "test";
        String comment = "test";
        String schemaId = "test";
        String revocable = "true";

        String expected = "Could not find file.";
        HttpStatus httpStatusExpected = HttpStatus.INTERNAL_SERVER_ERROR;

        // Act
        ResponseEntity<String> response = credentialDefinitionService.create(alias, comment, schemaId, revocable);
        String responseAsString = response.getBody();
        HttpStatus httpStatus = response.getStatusCode();

        // Assert
        assertEquals(expected, responseAsString);
        assertEquals(httpStatusExpected, httpStatus);
    }

    @Test
    void testGetAllCredDefs_withValid_ShouldReturnAllCredentialDefinitionsAnd201() {
        // Arrange
        installLissiApiServiceMock_provideExistingCredDefs();

        String activeState = "test";
        String searchText = "test";

        String expected = "All credential definitions should appear here.";
        HttpStatus httpStatusExpected = HttpStatus.CREATED;

        // Act
        ResponseEntity<String> response = credentialDefinitionService.getAllCredDefs(activeState, searchText);
        String responseAsString = response.getBody();
        HttpStatus httpStatus = response.getStatusCode();

        // Assert
        assertEquals(expected, responseAsString);
        assertEquals(httpStatusExpected, httpStatus);
    }
    

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
        Mockito.reset(lissiApiServiceMock);
        Mockito.reset(resourceServiceMock);
    }

    private void intallRessourceServiceMock_getDummyPng() {
        Mockito.when(resourceServiceMock.getDummyPng()).thenReturn(new ResourceService().getFile("img/logo.png"));
    }

    private void intallLissiApiServiceMock_createCredentialDefinition() {
        Mockito.when(lissiApiServiceMock.createCredentialDefinition(anyString(), anyString(), anyString(), anyString(), any(), anyString())).thenReturn(new ResponseEntity<>("Succesfully created new credential definition.", HttpStatus.CREATED));
    }

    private void installLissiApiServiceMock_provideExistingCredDefs() {
        ResponseEntity<String> response = new ResponseEntity<>("All credential definitions should appear here.", HttpStatus.CREATED);
        Mockito.when(lissiApiServiceMock.provideExistingCredDefs(anyString(), anyString())).thenReturn(response);
    }
    */

}
