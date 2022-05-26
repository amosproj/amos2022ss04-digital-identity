package didentity.amos.digitalIdentity.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(path = "/all")
    public @ResponseBody List<User> getAll() {
        List<User> actualList = new ArrayList<User>();
        Iterable<User> users = userRepository.findAll();
        for(User user: users){
            actualList.add(user);
        } 
        return actualList;
    }

}