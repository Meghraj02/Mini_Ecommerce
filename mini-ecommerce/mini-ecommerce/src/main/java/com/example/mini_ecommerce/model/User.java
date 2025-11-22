package com.example.mini_ecommerce.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id;         // User ID
    private String name;
    private String emailid;    // Email
    private String password;
    private String address;
    private String mobileno;   // Mobile number
    private String role;       // Role_Admin or Role_User

    public User() {
    }

    public User(String id, String name, String emailid, String password, String address, String mobileno, String role) {
        this.id = id;
        this.name = name;
        this.emailid = emailid;
        this.password = password;
        this.address = address;
        this.mobileno = mobileno;
        this.role = role;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmailid() { return emailid; }
    public void setEmailid(String emailid) { this.emailid = emailid; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getMobileno() { return mobileno; }
    public void setMobileno(String mobileno) { this.mobileno = mobileno; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
