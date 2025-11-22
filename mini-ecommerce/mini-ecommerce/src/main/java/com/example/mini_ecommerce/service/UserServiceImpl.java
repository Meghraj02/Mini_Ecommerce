package com.example.mini_ecommerce.service.impl;

import com.example.mini_ecommerce.model.User;
import com.example.mini_ecommerce.repository.UserRepository;
import com.example.mini_ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(String id, User user) {
        Optional<User> existing = userRepository.findById(id);
        if (existing.isPresent()) {
            User u = existing.get();
            u.setName(user.getName());
            u.setEmailid(user.getEmailid());
            u.setPassword(user.getPassword());
            u.setAddress(user.getAddress());
            u.setMobileno(user.getMobileno());
            u.setRole(user.getRole());
            return userRepository.save(u);
        }
        return null;
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByEmail(String emailid) {
        return userRepository.findByEmailid(emailid);
    }
}
