package com.miniapp.backend.services;

import com.miniapp.backend.models.User;
import com.miniapp.backend.repositories.UserRepository;
import com.miniapp.backend.security.PasswordEncoder;
import com.miniapp.backend.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
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
        
        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate and return token
        return tokenProvider.generateToken(user);
    }
    
    public void logout(String token) {
        tokenProvider.invalidateToken(token);
    }
    
    // Inner classes for request DTOs
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
