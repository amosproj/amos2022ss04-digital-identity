package didentity.amos.digitalIdentity.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private ResponseEntity<String> response401;
    private ResponseEntity<String> response403;
    private ResponseEntity<String> lastError;

    public AuthenticationService() {

        response401 = ResponseEntity.status(401)
                .body("Unauthorized, missing authentication.");
        response403 = ResponseEntity.status(403)
                .body("Forbidden.");
        lastError = null;

    }

    public ResponseEntity<String> getError() {
        return lastError;
    }

    public boolean authentication(String token) {
        if (token == null) {
            lastError = response401;
            return false;
        } else if (validation(token) == false) {
            lastError = response403;
            return false;
        }
        return true;
    }

    private boolean validation(String token) {
        return token.equalsIgnoreCase("passing") == true
                || token.equalsIgnoreCase("admin") == true;
    }

}
