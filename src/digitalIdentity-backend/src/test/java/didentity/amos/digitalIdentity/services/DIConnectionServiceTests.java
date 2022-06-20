package didentity.amos.digitalIdentity.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;


public class DIConnectionServiceTests {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    DIConnectionService diConnectionService;

    private User getDummyUser() {
        User user = new User();
        user.setId(1);
        user.setName("Test");
        user.setSurname("Test");
        user.setEmail("test@test.test");
        user.setUserRole(UserRole.EMPLOYEE);
        return user;
    }

    @Test
    public void testUpdateGeneric() {
       // Arrange
       User expected = getDummyUser();
       when(userRepository.findById(1)).thenReturn(Optional.of(expected));

       // Act
       ResponseEntity<String> responseEntity = diConnectionService.update(1, "TestChanged", "TestChanged", "test@test.test", "hr_employee");
       
       //Assert
       
       User changedUser = getDummyUser();
       changedUser.setName("TestChanged");
       changedUser.setSurname("TestChanged");
       changedUser.setUserRole(UserRole.HR_EMPLOYEE);

       ArgumentCaptor<User> argument = ArgumentCaptor.forClass(User.class);
       verify(userRepository).save(argument.capture());
       assertEquals(changedUser, argument.getValue());

       assertEquals(200, responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateWrongID() {
       // Arrange
       User expected = getDummyUser();
       when(userRepository.findById(1)).thenReturn(Optional.of(expected));

       // Act
       ResponseEntity<String> responseEntity = diConnectionService.update(-1, "TestChanged", "TestChanged", "test@test.test", "hr_employee");

       //Assert
       verify(userRepository, never()).save(any(User.class));
       assertEquals(400, responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateWrongRole() {
        // Arrange
        User expected = getDummyUser();
        when(userRepository.findById(1)).thenReturn(Optional.of(expected));

        // Act
        ResponseEntity<String> responseEntity = diConnectionService.update(1, "TestChanged", "TestChanged", "test@test.test", "EEEEEEEEEEEEEEEEEEEEEE");

        
        //Assert
        verify(userRepository, never()).save(any(User.class));
        assertEquals(500, responseEntity.getStatusCode());
    }


    @Test
    public void testGetConnectionByIdGeneric() {
        // Arrange
        User expected = getDummyUser();;
        when(userRepository.findById(1)).thenReturn(Optional.of(expected));

        // Act
        User result = diConnectionService.getConnectionById(1);

        //Assert
        assertEquals(expected, result);
    }

    @Test
    public void testGetConnectionByIdWrong() {
        // Arrange
        User expected = null;
        User user = getDummyUser();
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        // Act
        User result = diConnectionService.getConnectionById(-1);

        //Assert
        assertEquals(expected, result);
    }
    
}
