package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.passay.EnglishCharacterData;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class StrongPasswordServiceTest {

    private StrongPasswordService strongPasswordService;

    @BeforeEach
    void setUp() {
        strongPasswordService = new StrongPasswordService();
    }

    @Test
    void itShouldCreateAStrongPasswords() {
        // given
        int number_of_tests = 10;
        int max_len = 50;
        int min_length = 12;
        for (int i = 0; i < number_of_tests; i++) {
            int n = (int) (Math.random() * max_len) + min_length;

            // then
            itShouldCreateAStrongPasswords_helper(n);
        }

    }

    @Test
    void itShouldNotAcceptSmallLengths() {
        // given
        int min_length = 8;

        for (int i = 0; i < min_length; i++) {
            boolean errorThrown = false;
            try {
                // when
                strongPasswordService.generateSecurePassword(i);
            } catch (IllegalArgumentException e) {
                errorThrown = true;
            }

            assertTrue(errorThrown, "It should throw an illegal argument expection, as a password with length " + i
                    + " is not considered as save");
        }

    }

    void itShouldCreateAStrongPasswords_helper(int n) {
        // given
        // when
        String password = strongPasswordService.generateSecurePassword(n);
        System.out.println("Generate Password:\t" + password);
        // then
        int counted_chars = countCharacters(password);
        assertTrue(counted_chars >= n / 3);

        int counted_digits = countDigits(password);
        assertTrue(counted_digits >= n / 3);

        int counted_specials = countSpecial(password);
        assertTrue(counted_specials >= n / 3);
        System.out.println("\tsuccess");
    }

    private int countCharacters(String password) {
        int count = 0;
        String lower = EnglishCharacterData.LowerCase.getCharacters();
        String upper = EnglishCharacterData.UpperCase.getCharacters();
        for (char ch : password.toCharArray()) {
            if (lower.indexOf(ch) != -1 || upper.indexOf(ch) != -1) {
                count++;
            }
        }
        return count;
    }

    private int countDigits(String password) {
        int count = 0;
        String digits = EnglishCharacterData.Digit.getCharacters();
        for (char ch : password.toCharArray()) {
            if (digits.indexOf(ch) != -1) {
                count++;
            }
        }
        return count;
    }

    private int countSpecial(String password) {
        int count = 0;
        String special = strongPasswordService.specialCharacters.getCharacters();
        for (char ch : password.toCharArray()) {
            if (special.indexOf(ch) != -1) {
                count++;
            }
        }
        return count;
    }
}
