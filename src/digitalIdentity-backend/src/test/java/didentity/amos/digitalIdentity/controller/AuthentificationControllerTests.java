package didentity.amos.digitalIdentity.controller;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;

public class AuthentificationControllerTests {

    private static User user = new User();

    @BeforeAll
    public static void setup() {
        String email = "test@test.de";
        String password = "password";

        user.setEmail(email);
        user.setPassword(password);
        user.setId(99);
        user.setName("test");
        user.setSurname("test");
        user.setUserRole(UserRole.EMPLOYEE);
    }

    @AfterAll
    public static void teardown() {

    }

}
