package didentity.amos.digitalIdentity.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import didentity.amos.digitalIdentity.model.User;
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

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
