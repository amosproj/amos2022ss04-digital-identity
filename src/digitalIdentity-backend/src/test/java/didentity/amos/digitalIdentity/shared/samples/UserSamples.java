package didentity.amos.digitalIdentity.shared.samples;

import org.springframework.beans.factory.annotation.Autowired;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.services.EncryptionService;

public class UserSamples {

    @Autowired
    private EncryptionService encryptionService;

    public User getSampleUser() {
        String passwordEncoded = encryptionService.encodeBase64("passwort123");
        return getSampleUser(1, "achim@super.fix.com", "Achim", "Trautwein", passwordEncoded, UserRole.HR_EMPLOYEE,
                "invitationUrl", "connectionId");
    }

    public User getSampleUser(Integer id, String email, String name, String surname, String password,
            UserRole userRole, String invitationUrl, String connectionID) {
        String passwordEncoded = encryptionService.encodeBase64(password);

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setPassword(passwordEncoded);
        user.setUserRole(userRole);
        user.setConnectionId(connectionID);
        user.setInvitationUrl(invitationUrl);

        return user;
    }
}
