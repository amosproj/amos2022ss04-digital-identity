package didentity.amos.digitalIdentity.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@PreAuthorize("hasRole(T(didentity.amos.digitalIdentity.enums.UserRole).HR_EMPLOYEE")
public @interface HRAuthorization {
    
}
