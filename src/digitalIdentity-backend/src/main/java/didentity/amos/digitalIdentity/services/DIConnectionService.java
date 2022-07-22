package didentity.amos.digitalIdentity.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import didentity.amos.digitalIdentity.enums.UserRole;
import didentity.amos.digitalIdentity.model.connection.Connection;
import didentity.amos.digitalIdentity.model.connection.ConnectionContent;
import didentity.amos.digitalIdentity.messages.answers.credentials.CredentialAnswer;
import didentity.amos.digitalIdentity.messages.answers.proofs.ProofAnswer;
import didentity.amos.digitalIdentity.messages.responses.ConnectionsResponse;
import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;
import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Service
public class DIConnectionService {

    @Autowired
    private StrongPasswordService strongPasswordService;

    @Autowired
    private EncryptionService encryptionService;

    public void setStrongPasswordService(StrongPasswordService strongPasswordService) {
        this.strongPasswordService = strongPasswordService;
    }

    @Autowired
    private UserRepository userRepository;

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private LissiApiService lissiApiService;

    public void setLissiApiService(LissiApiService lissiApiService) {
        this.lissiApiService = lissiApiService;
    }

    @Autowired
    private MailService mailService;

    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * returns the json of a lissi-connection for given *id* as a parsed String.
     * 
     * @param id
     * @return String Returns "400" if no connection for given id was found, "500"
     *         if there exists
     *         more then one connection for given id or "200" and the json string of
     *         the requested
     *         object.
     */
    public User getConnectionById(int id) {
        // TODO: should return ResponseEntity
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public ResponseEntity<String> create(String name, String surname, String email,
            String user_role) {

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            return ResponseEntity.status(500).body("\"Email is already in use.\"");
        }

        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);

        String strongPassword = strongPasswordService.generateSecurePassword(20);
        String passwordEncoded = encryptionService.encodeBase64(strongPassword);
        user.setPassword(passwordEncoded);

        if (user_role != null && user_role != "") {
            switch (user_role.toLowerCase()) {
                case "admin":
                case "role_admin":
                    user.setUserRole(UserRole.fromString("ROLE_ADMIN"));
                    break;
                case "employee":
                case "role_employee":
                    user.setUserRole(UserRole.fromString("ROLE_EMPLOYEE"));
                    break;
                case "hr_employee":
                case "role_hr_employee":
                    user.setUserRole(UserRole.fromString("ROLE_HR_EMPLOYEE"));
                    break;
                case "guest":
                case "role_guest":
                    user.setUserRole(UserRole.fromString("ROLE_GUEST"));
                    break;
                default:
                    return ResponseEntity.status(500).body("\"User role not recognized.\"");
            }
        }

        return creatSaveInviteUserACID(user);

    }

    private ResponseEntity<String> creatSaveInviteUserACID(User user) {
        // is a commit (ACID): atomicity, consistency, isolation, durability
        String email = user.getEmail();
        String passwordDecoded = encryptionService.decodeBase64(user.getPassword());

        // lissi invite
        CreateConnectionResponse lissiResponse;
        // TODO: ist dieses try catch noch notwendig?
        try {
            ResponseEntity<CreateConnectionResponse> responseEntity = lissiApiService
                    .createConnectionInvitation(user.getEmail());
            if (responseEntity == null) {
                return ResponseEntity.status(500)
                        .body("\" in Lissi could not be created!\"");
            }
            lissiResponse = responseEntity.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("\" in Lissi could not be created!\"");
        }

        // save user to local database
        user.setInvitationUrl(lissiResponse.getInvitationUrl());
        user.setConnectionId(lissiResponse.getConnectionId());
        userRepository.save(user);

        // send invitation mail with qr Code
        // send invitation mail
        boolean sendInvitationSuccess = mailService.sendInvitation(email, user.getInvitationUrl());
        boolean sendPasswortSuccess = true;
        if (user.getUserRole() == UserRole.HR_EMPLOYEE) {
            sendPasswortSuccess = mailService.sendInitialPassword(email, passwordDecoded);
        }

        if (!sendInvitationSuccess || !sendPasswortSuccess) {
            remove(user);
            return ResponseEntity.status(500).body(
                    "\"Error during sending invitation mail process. Fully revoked creation.\"");
        }

        return ResponseEntity.status(201).body("\"Successful creation of the digital identity.\"");
    }

    public ResponseEntity<String> update(Integer id, String name, String surname, String email,
            String user_role) {

        Optional<User> optional = userRepository.findById(id);

        if (optional.isPresent() == false) {
            // TODO: might need a change. Otherwise you can fish for a valid id.
            return ResponseEntity.status(400).body("\"User with id " + id + " not found.\"");
        }
        User firstDI = optional.get();

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
                    return ResponseEntity.status(400).body("\"User role not recognized.\"");
            }
        }

        userRepository.save(firstDI);
        return ResponseEntity.status(200).body("\"" + firstDI.toString() + "\"");
    }

    public List<Connection> getAllConnections(boolean withOpenArtifacts) {
        ConnectionsResponse connectionsInLissiResponse = lissiApiService.provideExistingConnections().getBody();
        List<ConnectionContent> connectionsInLissi = connectionsInLissiResponse.getContent();

        Iterable<User> connectionsInDB = userRepository.findAll();

        List<CredentialAnswer> issuedCredentials = new ArrayList<CredentialAnswer>();
        if (withOpenArtifacts) {
            issuedCredentials = lissiApiService.getAllCredentials("", "0", "100", true).getBody().getContent();
        }

        List<Connection> connections = new ArrayList<Connection>();
        for (ConnectionContent content : connectionsInLissi) {
            Connection newConnection = new Connection(null, content.getId(), null, null, null, null, null,
                    content.getCreatedAt(), content.getUpdatedAt(), content.getState(), content.getTheirRole(),
                    content.getMyDid(), content.getTheirDid(), content.getMyLabel(), content.getTheirLabel(),
                    content.getAlias(), content.getImageUri(), content.getAccept());

            // Mapping zwischen DI aus Lissi (content) und DI aus DB (user)
            for (User user : connectionsInDB) {
                if (content.getId().equals(user.getConnectionId())) {
                    newConnection.setId(user.getId());
                    newConnection.setName(user.getName());
                    newConnection.setSurname(user.getSurname());
                    newConnection.setEmail(user.getEmail());
                    newConnection.setPassword(user.getPassword());
                    newConnection.setUserRole(user.getUserRole());
                    newConnection.setId(user.getId());
                }
            }
            
            if (withOpenArtifacts) {
                // Mapping zwischen DI aus Lissi (content) und credential aus Lissi
                int openCredentials = 0;
                for (CredentialAnswer issuedCredential: issuedCredentials) {
                    if (content.getId().equals(issuedCredential.getConnectionId())) {
                        openCredentials++;
                    }
                }
                newConnection.setOpenCredentials(Integer.toString(openCredentials));
                
                
                // Mapping zwischen DI aus Lissi (content) und proof aus Lissi
                List<ProofAnswer> openProofs = lissiApiService.getAllOpenProofsByConnectionId(content.getId(), "0", "100").getBody().getContent();
                newConnection.setOpenProofs(Integer.toString(openProofs.size()));
            }
        
            connections.add(newConnection);
        }

        return connections;
    }

    public ResponseEntity<String> remove(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return remove(user.get());
        } else {
            return ResponseEntity.status(200).body("\"Nothing to do. Connection was not found.\"");
        }
    }

    public ResponseEntity<String> remove(String connectionId) {
        Optional<User> user = userRepository.findByconnectionId(connectionId);
        if (user.isPresent()) {
            return remove(user.get());
        } else {
            return removeByConnectionId(connectionId);
        }
    }

    public ResponseEntity<String> remove(User user) {
        // TODO: revoking credentials and proofs is not implemented within the lissi
        // universe
        // return remove(user, true, true);
        return remove(user, false, false);
    }

    private ResponseEntity<String> remove(User user, boolean removeCreds, boolean removeProofs) {
        userRepository.delete(user);

        ResponseEntity<String> response = lissiApiService.removeConnection(user.getConnectionId(), removeCreds,
                removeProofs);
        if (response == null) {
            userRepository.save(user);
            return ResponseEntity.status(500).body("\"Could not remove the connection on the lissi ledger.\"");
        }
        return ResponseEntity.status(200).body("\"Successfully removed connection.\"");
    }

    private ResponseEntity<String> removeByConnectionId(String connectionId) {
        ResponseEntity<String> response = lissiApiService.removeConnection(connectionId, false,
                false);
        if (response == null) {
            return ResponseEntity.status(500).body("\"Could not remove the connection on the lissi ledger.\"");
        }
        return ResponseEntity.status(200).body("\"Successfully removed connection.\"");
    }

}
