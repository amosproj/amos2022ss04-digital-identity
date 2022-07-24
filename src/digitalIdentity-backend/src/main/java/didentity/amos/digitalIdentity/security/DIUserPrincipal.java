package didentity.amos.digitalIdentity.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import didentity.amos.digitalIdentity.model.User;
import didentity.amos.digitalIdentity.services.EncryptionService;

public class DIUserPrincipal implements UserDetails {
    private User user;
    
    public DIUserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection collection = new ArrayList<SimpleGrantedAuthority>();
        collection.add(new SimpleGrantedAuthority(user.getUserRole().getAuthority()));
        return collection;
    }

    @Override
    public String getPassword() {
        String passwordDecoded = EncryptionService.decodeBase64(user.getPassword());
        return "{noop}" + passwordDecoded;
    }

    @Override
    public String getUsername()  {
        return user.getEmail();
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }
}
