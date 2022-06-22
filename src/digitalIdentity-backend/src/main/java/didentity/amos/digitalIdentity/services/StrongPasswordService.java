package didentity.amos.digitalIdentity.services;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.stereotype.Component;

@Component
public class StrongPasswordService {
    public CharacterData specialCharacters = new CharacterData() {
        @Override
        public String getErrorCode() {
            return "INSUFFICIENT_SPECIAL";
        }

        @Override
        public String getCharacters() {
            return "!^\"§$/()=?*-{[]}@~";
        }
    };

    public String generateSecurePassword(int totalLength) throws IllegalArgumentException {
        return generateSecurePassword(totalLength / 3, totalLength);
    }

    private String generateSecurePassword(int each, int totalLength)
            throws IllegalArgumentException {
        if (totalLength <= 8) {
            throw new IllegalArgumentException("password of length 8 or less is not secure");
        }
        if (3 * each > totalLength) {
            throw new IllegalArgumentException("totalLength has to be at least 3*each");
        }

        // create character rule for lower case and upper case
        CharacterRule LCR = new CharacterRule(EnglishCharacterData.Alphabetical);
        // set number of lower case and upper case
        LCR.setNumberOfCharacters(each);

        // create character rule for digit
        CharacterRule DR = new CharacterRule(EnglishCharacterData.Digit);
        // set number of digits
        DR.setNumberOfCharacters(each);

        // create character rule for lower case
        CharacterRule SR = new CharacterRule(specialCharacters);
        // set number of special characters
        SR.setNumberOfCharacters(each);

        // create instance of the PasswordGenerator class
        PasswordGenerator passGen = new PasswordGenerator();

        // call generatePassword() method of PasswordGenerator class to get Passay
        // generated password
        String password = passGen.generatePassword(totalLength, SR, LCR, DR);

        // return Passay generated password to the main() method
        return password;
    }

}
