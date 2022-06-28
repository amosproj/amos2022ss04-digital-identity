package didentity.amos.digitalIdentity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@SpringBootApplication
public class DigitalIdentityApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalIdentityApplication.class, args);
	}

}
