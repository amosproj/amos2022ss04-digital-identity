package didentity.amos.digitalIdentity.shared.samples;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;

public class UserSamples {

    public static User getSampleUser() {
        return getSampleUser("achim@super.fix.com", "Achim", "Trautwein", "passwort123", UserRole.HR_EMPLOYEE);
    }

    public static User getSampleUser(String email, String name, String surname, String password, UserRole userRole) {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setPassword(password);
        user.setUserRole(userRole);

        return user;
    }
}
