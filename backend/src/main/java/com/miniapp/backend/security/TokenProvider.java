package com.miniapp.backend.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.miniapp.backend.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class TokenProvider {

    @Value("${jwt.secret:defaultSecretKey}")
    private String secretKey;

    @Value("${jwt.expiration:3600000}")
    private long expirationTime;

    private Key signingKey;

    private Set<String> invalidatedTokens = ConcurrentHashMap.newKeySet();

    @PostConstruct
    public void init() {
        if (secretKey == null || secretKey.isBlank() || "defaultSecretKey".equals(secretKey)) {
            throw new IllegalStateException("JWT secret not configured. Set JWT_SECRET environment variable to a strong secret.");
        }
        if (secretKey.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("JWT secret is too short. Provide at least 256 bits (32 bytes) of secret data.");
        }
        if (expirationTime <= 0) {
            throw new IllegalStateException("JWT expiration must be a positive number of milliseconds. Set JWT_EXPIRATION environment variable.");
        }

        signingKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(String.valueOf(user.getUserId()))
                .claim("username", user.getUsername())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) return false;
        if (invalidatedTokens.contains(token)) return false;
        try {
            Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public void invalidateToken(String token) {
        if (token != null) invalidatedTokens.add(token);
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token).getBody();
        return Long.parseLong(claims.getSubject());
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token).getBody();
        return claims.get("username", String.class);
    }
}
