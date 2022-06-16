package didentity.amos.digitalIdentity.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

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

    public ResponseEntity<String> handleChangePassword(String email, String old_password, String new_password) {
        Optional<User> lookUp = userRepository.findByEmail(email);

        if (lookUp.isPresent() == false) {
            return ResponseEntity.status(403)
                    .body("\"Mismatch of user and password. User might not exists or the password not matching.\"");
        }

        User di = lookUp.get();
        if (di.getPassword().equals(old_password) == false) {
            return ResponseEntity.status(403)
                    .body("\"Mismatch of user and password. User might not exists or the password not matching.\"");
        }

        di.setPassword(new_password);

        userRepository.save(di);
        return ResponseEntity.status(201).body("\"Changing the password succeeded.\"");
    }

    public ResponseEntity<String> login(
            String email,
            String password) {

        if (email == null || email == "") {
            return ResponseEntity.status(400).body("\"Bad request. Email is empty.\"");
        }

        if (password == null || password == "") {
            return ResponseEntity.status(400).body("\"Bad request. Password is empty.\"");
        }

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password))
            return ResponseEntity.status(200).body("\"Login successful.\"");

        return ResponseEntity.status(200).body("\"Password and username do not match.\"");
    }

}
