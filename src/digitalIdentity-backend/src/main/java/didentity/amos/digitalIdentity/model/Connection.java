package didentity.amos.digitalIdentity.model;

import didentity.amos.digitalIdentity.enums.UserRole;

public class Connection {
    
    private String id; // alt: Integer

    private String name;

    private String surname;

    private String email;

    private String password;

    private UserRole userRole;

    private String createdAt;

    private String updatedAt;

    private String state;

    private String theirRole;

    private String myDid;

    private String theirDid;

    private String myLabel;

    private String theirLabel;

    private String alias;

    private String imageUri;

    private String accept;

    public Connection(String id, String name, String surname, String email, String password, UserRole userRole,
            String createdAt, String updatedAt, String state, String theirRole, String myDid, String theirDid,
            String myLabel, String theirLabel, String alias, String imageUri, String accept) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.state = state;
        this.theirRole = theirRole;
        this.myDid = myDid;
        this.theirDid = theirDid;
        this.myLabel = myLabel;
        this.theirLabel = theirLabel;
        this.alias = alias;
        this.imageUri = imageUri;
        this.accept = accept;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public String getState() {
        return state;
    }

    public String getTheirRole() {
        return theirRole;
    }

    public String getMyDid() {
        return myDid;
    }

    public String getTheirDid() {
        return theirDid;
    }

    public String getMyLabel() {
        return myLabel;
    }

    public String getTheirLabel() {
        return theirLabel;
    }

    public String getAlias() {
        return alias;
    }

    public String getImageUri() {
        return imageUri;
    }

    public String getAccept() {
        return accept;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setTheirRole(String theirRole) {
        this.theirRole = theirRole;
    }

    public void setMyDid(String myDid) {
        this.myDid = myDid;
    }

    public void setTheirDid(String theirDid) {
        this.theirDid = theirDid;
    }

    public void setMyLabel(String myLabel) {
        this.myLabel = myLabel;
    }

    public void setTheirLabel(String theirLabel) {
        this.theirLabel = theirLabel;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public void setAccept(String accept) {
        this.accept = accept;
    }

}
