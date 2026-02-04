package com.miniapp.backend.security;

import com.miniapp.backend.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
public class TokenProvider {
    
    @Value("${jwt.secret:defaultSecretKey}")
    private String secretKey;
    
    @Value("${jwt.expiration:3600000}")
    private long expirationTime;
    
    private Set<String> invalidatedTokens = new HashSet<>();
    
    public String generateToken(User user) {
        // Simple token generation for demonstration
        // In production, use JWT library like jjwt
        String token = UUID.randomUUID().toString() + "-" + user.getUserId();
        return token;
    }
    
    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        return !invalidatedTokens.contains(token);
    }
    
    public void invalidateToken(String token) {
        if (token != null) {
            invalidatedTokens.add(token);
        }
    }
}
