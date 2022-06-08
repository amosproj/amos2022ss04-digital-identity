package didentity.amos.digitalIdentity.services;

import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
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
     * @return String Returns "missing" if no connection for given id was found,
     *         "duplicate" if there exists more then one connection for given id or
     *         the json string of the requested object
     */
    public String getConntectionByID(int id) {
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
            return "missing";
        }
        User firstDI = diIterator.next();
        if (diIterator.hasNext()) {
            // TODO: add error logging?
            return "duplicate";
        }

        // construct json string of DI
        String json_string = firstDI.toString();

        return json_string;
    }

}
