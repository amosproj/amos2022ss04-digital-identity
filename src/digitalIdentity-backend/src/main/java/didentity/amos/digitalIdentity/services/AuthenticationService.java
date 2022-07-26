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

    @Autowired
    private StrongPasswordService strongPasswordService;

    @Autowired
    private MailService mailService;

    @Autowired
    private DIConnectionService diConnectionService;

    @Deprecated
    private ResponseEntity<String> response401;

    @Deprecated
    private ResponseEntity<String> response403;

    @Deprecated
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

    @Deprecated
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

    @Deprecated
    private boolean validation(String token) {
        return token.equalsIgnoreCase("passing") == true
                || token.equalsIgnoreCase("admin") == true;
    }

    public ResponseEntity<String> handleChangePassword(String email, String oldPassword, String newPassword) {
        Optional<User> lookUp = userRepository.findByEmail(email);

        if (lookUp.isPresent() == false) {
            return ResponseEntity.status(403)
                    .body("\"Mismatch of user and password. User might not exists or the password not matching.\"");
        }

        User di = lookUp.get();
        String passwordDecoded = EncryptionService.decodeBase64(di.getPassword());
        if (passwordDecoded.equals(oldPassword) == false) {
            return ResponseEntity.status(403)
                    .body("\"Mismatch of user and password. User might not exists or the password not matching.\"");
        }

        String passwordEncoded = EncryptionService.encodeBase64(newPassword);
        di.setPassword(passwordEncoded);

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
        String passwordDecoded = EncryptionService.decodeBase64(user.get().getPassword());
        if (user.isPresent() && passwordDecoded.equals(password))
            return ResponseEntity.status(200).body("\"Login successful.\"");

        return ResponseEntity.status(200).body("\"Password and email do not match.\"");
    }

    public ResponseEntity<String> handleForgotPassword(String email) {
        if (email == null || email == "") {
            return ResponseEntity.status(400).body("\"Bad request. Email is empty.\"");
        }

        if (userRepository.count() == 0) {
            return diConnectionService.create("Initiate", "HR-User", email, "role_hr_employee");
        }

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent() == false) {
            return ResponseEntity.status(500).body("\"Email not found.\"");
        }
        User user = optional.get();
        String old_password = user.getPassword();

        // set new password
        String password = strongPasswordService.generateSecurePassword(20);
        String passwordEncoded = EncryptionService.encodeBase64(password);
        user.setPassword(passwordEncoded);
        userRepository.save(user);

        // send mail containing the new password
        if (mailService.sendNewPassword(email, password) == false) {
            // reset password to old password
            user.setPassword(old_password);
            userRepository.save(user);
            return ResponseEntity.status(500).body("\"Internal Server Error. Could not send mail.\"");
        }

        return ResponseEntity.status(200).body("\"Password was reset.\"");
    }
}
