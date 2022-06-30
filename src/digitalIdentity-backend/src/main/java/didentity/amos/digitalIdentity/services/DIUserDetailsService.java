package didentity.amos.digitalIdentity.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.repository.UserRepository;
import didentity.amos.digitalIdentity.security.DIUserPrincipal;

@Service
public class DIUserDetailsService implements UserDetailsService{
    
    @Autowired UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(email);
        }
        return new DIUserPrincipal(user.get());
    }


}
