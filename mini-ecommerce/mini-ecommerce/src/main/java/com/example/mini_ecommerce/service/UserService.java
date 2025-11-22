package com.example.mini_ecommerce.service;

import com.example.mini_ecommerce.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    User createUser(User user);
    User updateUser(String id, User user);
    void deleteUser(String id);
    User getUserByEmail(String emailid);
}
