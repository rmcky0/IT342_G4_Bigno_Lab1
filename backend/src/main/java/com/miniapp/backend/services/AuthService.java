package com.miniapp.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniapp.backend.dtos.LoginRequest;
import com.miniapp.backend.dtos.RegisterRequest;
import com.miniapp.backend.models.User;
import com.miniapp.backend.repositories.UserRepository;
import com.miniapp.backend.security.PasswordEncoder;
import com.miniapp.backend.security.PasswordService;
import com.miniapp.backend.security.TokenProvider;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private TokenProvider tokenProvider;

    public User registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent() ||
            userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        
        return userRepository.save(user);
    }
    
    public String authenticate(LoginRequest request) {
        // Find user by username or email
        User user = userRepository.findByUsername(request.getUsername())
            .or(() -> userRepository.findByEmail(request.getUsername()))
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // Validate password via dedicated PasswordService
        if (!passwordService.verify(user, request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate and return token
        return tokenProvider.generateToken(user);
    }
    
    public void logout(String authorizationHeader) {
        if (authorizationHeader == null) return;
        String token = authorizationHeader;
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        tokenProvider.invalidateToken(token);
    }
}

