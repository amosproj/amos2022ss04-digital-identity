package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;


public class DIConnectionServiceTests {

    @Test
    public void testUpdateGeneric() {
       // Arrange
       User expected = new User();
       expected.setId(1);
       expected.setName("TestChanged");
       expected.setSurname("TestChanged");
       expected.setEmail("test@test.test");
       expected.setUserRole(UserRole.HR_EMPLOYEE);
       DIConnectionService diConnectionService = new DIConnectionService();
       diConnectionService.create("Test", "Test", "test@test.test", "employee");

       // Act
       ResponseEntity<String> responseEntity = diConnectionService.update(1, "TestChanged", "TestChanged", "test@test.test", "hr_employee");

       //Assert
       assertEquals(200, responseEntity.getStatusCode());
       assertEquals(expected, diConnectionService.getConnectionById(1));
    }

    @Test
    public void testUpdateWrongID() {
       // Arrange
       DIConnectionService diConnectionService = new DIConnectionService();

       // Act
       ResponseEntity<String> responseEntity = diConnectionService.update(-1, "TestChanged", "TestChanged", "test@test.test", "hr_employee");

       //Assert
       assertEquals(400, responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateWrongRole() {
        // Arrange
        User expected = new User();
        expected.setId(1);
        expected.setName("Test");
        expected.setSurname("Test");
        expected.setEmail("test@test.test");
        expected.setUserRole(UserRole.EMPLOYEE);
        DIConnectionService diConnectionService = new DIConnectionService();
        diConnectionService.create("Test", "Test", "test@test.test", "employee");

        // Act
        ResponseEntity<String> responseEntity = diConnectionService.update(1, "TestChanged", "TestChanged", "test@test.test", "EEEEEEEEEEEEEEEEEEEEEE");

        //Assert
        assertEquals(500, responseEntity.getStatusCode());
        assertEquals(expected, diConnectionService.getConnectionById(1));
    }


    @Test
    public void testGetConnectionByIdGeneric() {
        // Arrange
        User expected = new User();
        expected.setId(1);
        expected.setName("Test");
        expected.setSurname("Test");
        expected.setEmail("test@test.test");
        expected.setUserRole(UserRole.EMPLOYEE);
        DIConnectionService diConnectionService = new DIConnectionService();
        diConnectionService.create("Test", "Test", "test@test.test", "employee");

        // Act
        User result = diConnectionService.getConnectionById(1);

        //Assert
        assertEquals(expected, result);
    }

    @Test
    public void testGetConnectionByIdWrong() {
        // Arrange
        User expected = null;
        DIConnectionService diConnectionService = new DIConnectionService();
        diConnectionService.create("Test", "Test", "test@test.test", "employee");

        // Act
        User result = diConnectionService.getConnectionById(-1);

        //Assert
        assertEquals(expected, result);
    }
    
}
