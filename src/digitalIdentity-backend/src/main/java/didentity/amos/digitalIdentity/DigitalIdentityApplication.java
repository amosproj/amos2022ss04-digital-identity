package didentity.amos.digitalIdentity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class DigitalIdentityApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitalIdentityApplication.class, args);
    }

}
