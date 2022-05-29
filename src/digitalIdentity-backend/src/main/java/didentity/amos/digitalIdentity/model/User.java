package didentity.amos.digitalIdentity.model;

import java.util.Random;

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

    private String email;

    @JsonIgnore
    private String password;

    private String company;

    private UserRole userRole;

    private String team;

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

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
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

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCompany() {
        return company;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    @Override
    public String toString() {
        Random rd = new Random();
        String details = "["
                + "  \"birthday\":\"" + this.birthday + "\""
                + ", \"company\":\"" + this.company + "\""
                + ", \"userRole\":\"" + this.userRole + "\""
                + ", \"team\":\"" + this.team + "\""
                + "]";

        return "{ "
                + "\"id\":\"" + Integer.toString(this.id) + "\""
                + ", \"name\":\"" + this.name + "\""
                + ", \"surname\":\"" + this.surname + "\""
                + ", \"email\":\"" + this.email + "\""
                + ", \"openCredentials\":" + rd.nextInt(42)
                + ", \"openProofs\":" + rd.nextInt(42)
                + ", \"connectionStatus\":" + (rd.nextInt(42) >= 21)
                + ", \"details\":" + details
                + "}";
    }

}
