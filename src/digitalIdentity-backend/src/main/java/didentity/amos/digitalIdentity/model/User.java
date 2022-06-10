package didentity.amos.digitalIdentity.model;

import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import didentity.amos.digitalIdentity.enums.UserRole;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String surname;

    private String birthday;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private UserRole userRole;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        Random rd = new Random();

        return "{ "
                + "\"id\":\"" + this.id + "\""
                + ", \"name\":\"" + this.name + "\""
                + ", \"surname\":\"" + this.surname + "\""
                + ", \"email\":\"" + this.email + "\""
                + ", \"openCredentials\":" + rd.nextInt(42)
                + ", \"openProofs\":" + rd.nextInt(42)
                + ", \"connectionStatus\":" + (rd.nextInt(42) >= 21)
                + ", \"userRole\":\"" + this.userRole + "\""
                + "}";
    }

}
