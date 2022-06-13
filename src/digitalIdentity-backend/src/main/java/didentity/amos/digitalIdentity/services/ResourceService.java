package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {

    public File getDummyPng() {
        return getFile("img/logo.png");
    }

    public File getFile(String path) {
        File file;
        try {
            file = new ClassPathResource(path).getFile();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return file;
    }

}
