package didentity.amos.digitalIdentity.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

  @Configuration
  @Order(SecurityProperties.BASIC_AUTH_ORDER)
  public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http
        .httpBasic()
      .and()
        .authorizeRequests()
          .antMatchers("/index.html", "/", "/login", "/auth/password/forgot", "/auth/password/change").permitAll()
          .anyRequest().authenticated()
      .and().csrf()
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

      http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
      .logoutSuccessUrl("/logout.done").deleteCookies("JSESSIONID")
      .invalidateHttpSession(true);
    }
  }

    
