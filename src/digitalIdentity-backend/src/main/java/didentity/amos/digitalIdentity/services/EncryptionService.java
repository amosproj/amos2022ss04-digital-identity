package didentity.amos.digitalIdentity.services;

import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    public String encodeBase64(String input) {
        return Base64.getEncoder().encodeToString(input.getBytes());
    }

    public String decodeBase64(String input) {
        byte[] decodedBytes = Base64.getDecoder().decode(input);
        return new String(decodedBytes);
    }
    
}
