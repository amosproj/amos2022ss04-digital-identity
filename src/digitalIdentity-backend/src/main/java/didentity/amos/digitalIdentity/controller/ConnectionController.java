package didentity.amos.digitalIdentity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;

@Controller
@RequestMapping(path = "/connection")
public class ConnectionController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String getAll() {
        Iterable<User> users = userRepository.findAll();
        String json_string = "[";
        for (User user : users) {
            json_string += user.toString() + ",";
        }
        json_string += "]";
        return json_string;
    }

}