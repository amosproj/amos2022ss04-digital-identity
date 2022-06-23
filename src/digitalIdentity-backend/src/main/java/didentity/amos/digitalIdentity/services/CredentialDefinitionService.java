package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CredentialDefinitionService {

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private ResourceService resourceService;

    public ResponseEntity<String> create(String alias, String comment, String schemaId, boolean revocable) {
        String imageUri = "null";
        File file = resourceService.getDummyPng();

        if (file == null) {
            return ResponseEntity.status(500).body("Could not find file.");
        }

        String response = lissiApiService.createCredentialDefinition(alias, comment, imageUri, schemaId, file, revocable);

        if (response == null) {
            return ResponseEntity.status(500).body("Could not create a new credential.");
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws FileUploadException {
        this.save(file);

        return ResponseEntity.status(HttpStatus.OK)
                .body("Uploaded the file successfully: " + file.getOriginalFilename());
    }

    @Value("${upload.path}")
    private String uploadPath;

    public void save(MultipartFile file) throws FileUploadException {
        try {
            Path root = Paths.get(uploadPath);
            Path resolve = root.resolve(file.getOriginalFilename());
            if (resolve.toFile()
                    .exists()) {
                throw new FileUploadException("File already exists: " + file.getOriginalFilename());
            }
            Files.copy(file.getInputStream(), resolve);
        } catch (Exception e) {
            throw new FileUploadException("Could not store the file. Error: " + e.getMessage());
        }
    }

}
