package com.miniapp.backend.dtos;

public class AuthResponse {
    private String message;
    private Long userId;
    private String username;
    private String email;

    public AuthResponse() {}

    public AuthResponse(String message, Long userId, String username, String email) {
        this.message = message;
        this.userId = userId;
        this.username = username;
        this.email = email;
    }

    public String getMessage() { return message; }
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }

    public void setMessage(String message) { this.message = message; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
}
