package didentity.amos.digitalIdentity.shared.samples;
import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;

public class UserSamples {

    public static User getSampleUser() {
        return getSampleUser(1, "achim@super.fix.com", "Achim", "Trautwein", "passwort123", UserRole.HR_EMPLOYEE,
                "invitationUrl", "connectionId");
    }

    public static User getSampleUser(Integer id, String email, String name, String surname, String password,
            UserRole userRole, String invitationUrl, String connectionID) {

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setPassword(password);
        user.setUserRole(userRole);
        user.setConnectionId(connectionID);
        user.setInvitationUrl(invitationUrl);

        return user;
    }
}
