package didentity.amos.digitalIdentity.enums;

public enum UserRole implements GrantedAuthority {
    ADMIN("ROLE_ADMIN"),
    EMPLOYEE("ROLE_EMPLOYEE"),
    HR_EMPLOYEE("ROLE_HR_EMPLOYEE"),
    GUEST("ROLE_GUEST");
    
    private final String authority;

    UserRole(String authority) {
        this.authority = authority;
    }

    public static UserRole fromString(String role) {
        for (UserRole ur : UserRole.values()) {
            if (ur.authority.equalsIgnoreCase(role)) {
                return ur;
            }
        }
        return null;
    }
}
