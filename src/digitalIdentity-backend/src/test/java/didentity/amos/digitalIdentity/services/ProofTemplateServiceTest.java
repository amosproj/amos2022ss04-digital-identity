package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.io.File;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@DataJpaTest
public class ProofTemplateServiceTest {

    private ProofTemplateService proofTemplateService;

    @Mock
    private LissiApiService lissiApiService;

    @Mock
    private ResourceService resourceService;

    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        proofTemplateService = new ProofTemplateService();
        proofTemplateService.setLissiApiService(lissiApiService);
        proofTemplateService.setResourceService(resourceService);
        defaultMocking();
    }

    void defaultMocking() {
        ResponseEntity<String> responseEntity = new ResponseEntity<String>("anyString",
                HttpStatus.CREATED);
        Mockito.when(lissiApiService.createProofTemplate(anyString(), anyString(), anyString(), anyString(), anyString(), any()))
                .thenReturn(responseEntity);

        Mockito.when(lissiApiService.provideExistingProofTemplates(anyString(), anyString()))
                .thenReturn(new ResponseEntity<String>("anyString", HttpStatus.valueOf(201)));
        File file;
        try {
            file = new ClassPathResource("img/logo.png").getFile();
            Mockito.when(resourceService.getDummyPng()).thenReturn(file);
        } catch (IOException e) {
            e.printStackTrace();
            assertEquals(true, false);
        }
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
        Mockito.reset(lissiApiService);
        Mockito.reset(resourceService);
    }

    @Test
    public void testCreateProofTemplateGeneric() {
        // Arrange

        // Act
        ResponseEntity<String> responseEntity = proofTemplateService.createProofTemplate("alias", "1.0", "", "", "", null);

        // Assert
        verify(lissiApiService).createProofTemplate(anyString(), anyString(), anyString(), anyString(), anyString(), any());
        assertEquals(HttpStatus.valueOf(201), responseEntity.getStatusCode());
    }

    @Test
    public void testCreateProofTemplateWrongFile() {
        // Arrange
        Mockito.when(resourceService.getDummyPng()).thenReturn(null);

        // Act
        ResponseEntity<String> responseEntity = proofTemplateService.createProofTemplate("alias", "1.0", "", "", "", null);

        // Assert
        verify(lissiApiService, never()).createProofTemplate(anyString(), anyString(), anyString(), anyString(), anyString(), any());
        assertEquals(HttpStatus.valueOf(500), responseEntity.getStatusCode());
    }

    @Test
    public void testCreateProofTemplateLissiApiNotWorking() {
        // Arrange
        Mockito.when(lissiApiService.createProofTemplate(anyString(), anyString(), anyString(), anyString(), anyString(), any()))
                .thenReturn(null);

        // Act
        ResponseEntity<String> responseEntity = proofTemplateService.createProofTemplate("alias", "1.0", "", "", "", null);

        // Assert
        verify(lissiApiService).createProofTemplate(anyString(),anyString(), anyString(), anyString(), anyString(), any());
        assertEquals(HttpStatus.valueOf(500), responseEntity.getStatusCode());
    }

    @Test
    public void testGetAllProofTemplatesGeneric() {
        // Arrange

        // Act
        ResponseEntity<String> responseEntity = proofTemplateService.getAllProofTemplates("activeState", "searchText");

        // Assert
        assertNotNull(responseEntity);
    }

    @Test
    public void testGetAllProofTemplatesLissiApiServiceNotWorking() {
        // Arrange
        Mockito.when(lissiApiService.provideExistingProofTemplates(anyString(), anyString())).thenReturn(null);

        // Act
        ResponseEntity<String> responseEntity = proofTemplateService.getAllProofTemplates("activeState", "searchText");

        // Assert
        assertEquals(HttpStatus.valueOf(500), responseEntity.getStatusCode());
    }
}
