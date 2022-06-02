package didentity.amos.digitalIdentity.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/schema")
public class SchemaController {
    
    @PostMapping(path = "/schema/create")
    public @ResponseBody ResponseEntity<String> testingCreateSchema(@RequestParam String name,
            @RequestBody String string) {
        System.out.println("request: schema/create:");
        System.out.println("\t" + string);

        if (name.equalsIgnoreCase("error")) {
            return ResponseEntity.status(500).body("\"nope\"");
        }
        if (name.equalsIgnoreCase("nope")) {
            return ResponseEntity.status(400).body("\"nope\"");
        }
        return ResponseEntity.status(201).body("\"ok\"");

    }
}
