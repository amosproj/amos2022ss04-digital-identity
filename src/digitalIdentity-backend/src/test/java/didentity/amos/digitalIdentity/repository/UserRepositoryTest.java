package didentity.amos.digitalIdentity.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import didentity.amos.digitalIdentity.model.User;

public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    // test DataBase creation
    @Test
    void itShouldFindACreatedUser() {
        // given
        String email = "test@mail.org";
        User user = new User();
        user.setEmail(email);
        userRepository.save(user);

        // when
        Optional<User> optional = userRepository.findByEmail(email);

        // then
        assertTrue(optional.isPresent());
    }

}
