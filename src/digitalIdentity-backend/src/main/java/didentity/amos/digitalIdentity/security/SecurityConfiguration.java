package didentity.amos.digitalIdentity.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    // @Override
    // protected void configure(HttpSecurity httpSecurity) throws Exception {
    //     httpSecurity.authorizeRequests()
    //             .anyRequest().authenticated()
    //             .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    // }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http
        .httpBasic()
      .and()
        .authorizeRequests()
        .anyRequest().authenticated();
    }
}
    
