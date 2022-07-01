package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class PresentationProofServiceTest {

    private PresentationProofService presentationProofService;

    @Mock
    private LissiApiService lissiApiService;

    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        presentationProofService = new PresentationProofService();
        presentationProofService.setLissiApiService(lissiApiService);

        ResponseEntity<String> responseEntity = new ResponseEntity<String>("anyString",
                HttpStatus.CREATED);
        Mockito.when(lissiApiService.sendProofTemplateToConnection(anyString(), anyString())).thenReturn(responseEntity);
    }

    @Test
    void testSendProofTemplateToConnectionGeneric() {
        // Arrange

        // Act
        ResponseEntity<String> responseEntity = presentationProofService.sendProofTemplateToConnection("connectionID", "proofTemplateId");

        // Assert
        verify(lissiApiService).sendProofTemplateToConnection(anyString(), anyString());
        assertEquals(HttpStatus.valueOf(201), responseEntity.getStatusCode());
    }

    @Test
    public void testSendProofTemplateToConnectionLissiApiServiceNotWorking() {
        // Arrange
        Mockito.when(lissiApiService.sendProofTemplateToConnection(anyString(), anyString()))
                .thenReturn(null);

        // Act
        ResponseEntity<String> responseEntity = presentationProofService.sendProofTemplateToConnection("connectionID", "proofTemplateId");

        // Assert
        verify(lissiApiService).sendProofTemplateToConnection(anyString(), anyString());
        assertEquals(HttpStatus.valueOf(500), responseEntity.getStatusCode());
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
        Mockito.reset(lissiApiService);
    }
}
