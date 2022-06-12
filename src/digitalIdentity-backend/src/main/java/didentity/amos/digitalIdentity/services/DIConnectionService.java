package didentity.amos.digitalIdentity.services;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Service
public class DIConnectionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LissiApiService lissiApiService;

    @Autowired
    private MailService mailService;

    /**
     * returns the json of a lissi-connection for given *id* as a paresed String.
     * 
     * @param id
     * @return String Returns "400" if no connection for given id was found,
     *         "500" if there exists more then one connection for given id or
     *         "200" and the json string of the requested object.
     */
    public User getConnectionById(int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public ResponseEntity<String> create(
            String name,
            String surname,
            String email,
            String user_role) {

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            return ResponseEntity.status(500).body("\"Email is already in use.\"");
        }

        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);

        // TODO: create onetime password
        user.setPassword("test");

        if (user_role != null && user_role != "") {
            switch (user_role) {
                case "admin":
                    user.setUserRole(UserRole.fromString("ROLE_ADMIN"));
                    break;
                case "employee":
                    user.setUserRole(UserRole.fromString("ROLE_EMPLOYEE"));
                    break;
                case "hr_employee":
                    user.setUserRole(UserRole.fromString("ROLE_HR_EMPLOYEE"));
                    break;
                case "guest":
                    user.setUserRole(UserRole.fromString("ROLE_GUEST"));
                    break;
                default:
                    return ResponseEntity.status(500).body("\"User role not recognized.\"");
            }
        }

        try {
            String invitationUrl = lissiApiService.createConnectionInvitation(email);
            String mailSuccess = mailService.sendInvitation(email, invitationUrl);
            if (!mailSuccess.equals("success")) {
                // TODO: delete created/deactivate lissi connection/invite (within the lissi
                // cloud)
                return ResponseEntity.status(500).body("\"Mail couldn't be sent! Error: " + mailSuccess + "\"");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("\"Invitation in Lissi could not be created! Error: " + e.toString() + "\"");
        }

        userRepository.save(user);
        return ResponseEntity.status(200).body("\"Successful creation of the digital identity.\"");

    }

    public ResponseEntity<String> update(
            Integer id,
            String name,
            String surname,
            String email,
            String user_role) {

        LinkedList<Integer> ids = new LinkedList<Integer>();
        ids.add(id);
        // TODO: maybe use findById instead? This would skip all the Iterator stuff
        Iterable<User> DIs = userRepository.findAllById(ids);

        Iterator<User> diIterator = DIs.iterator();
        if (!diIterator.hasNext()) {
            // TODO: might need a change. Otherwise you can fish for a valid id.
            return ResponseEntity.status(400).body("\"No DI with this id was found.\"");
        }
        User firstDI = diIterator.next();

        if (name != null && name != "") {
            firstDI.setName(name);
        }
        if (surname != null && surname != "") {
            firstDI.setSurname(surname);
        }
        if (email != null && surname != "") {
            firstDI.setEmail(email);
        }

        if (user_role != null && user_role != "") {
            switch (user_role) {
                case "admin":
                    firstDI.setUserRole(UserRole.fromString("ROLE_ADMIN"));
                    break;
                case "employee":
                    firstDI.setUserRole(UserRole.fromString("ROLE_EMPLOYEE"));
                    break;
                case "hr_employee":
                    firstDI.setUserRole(UserRole.fromString("ROLE_HR_EMPLOYEE"));
                    break;
                case "guest":
                    firstDI.setUserRole(UserRole.fromString("ROLE_GUEST"));
                    break;
                default:
                    return ResponseEntity.status(500).body("\"User role not recognized.\"");
            }
        }

        userRepository.save(firstDI);
        return ResponseEntity.status(200).body(firstDI.toString());
    }

    public Iterable<User> getAllConnections() {
        return userRepository.findAll();
    }

    public ResponseEntity<String> remove(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            //TODO remove connection in LissiAPI
            return ResponseEntity.status(200).body("success.");
        } else {
            return ResponseEntity.status(404).body("User with id " + id + " not found.");
        }
    }

}
