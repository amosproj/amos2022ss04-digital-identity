package didentity.amos.digitalIdentity.services;

import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Service
public class DIConnectionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LissiApiService lissiApiService;

    public String invite(String alias) {
        return lissiApiService.createConnectionInvitation(alias);
    }

    /**
     * returns the json of a lissi-connection for given *id* as a paresed String.
     * 
     * @param id
     * @return String Returns "400" if no connection for given id was found,
     *         "500" if there exists more then one connection for given id or
     *         "200" and the json string of the requested object.
     */
    public ResponseEntity<String> getConntectionByID(int id) {
        // Send 200 with the following json
        // build custom json using the toString method:

        // get all DIs for given id
        LinkedList<Integer> ids = new LinkedList<Integer>();
        ids.add(id);
        Iterable<User> DIs = userRepository.findAllById(ids);

        // get Iterator for DIs
        Iterator<User> diIterator = DIs.iterator();
        if (!diIterator.hasNext()) {
            // TODO: add error logging?
            return ResponseEntity.status(400).body("\"No DI with this id was found!\"");
        }
        User firstDI = diIterator.next();
        if (diIterator.hasNext()) {
            // TODO: add error logging?
            return ResponseEntity.status(500).body("\"More than one DI with the same id was found!\"");
        }

        // construct json string of DI
        String json_string = firstDI.toString();

        return ResponseEntity.status(200).body(json_string);
    }

}
