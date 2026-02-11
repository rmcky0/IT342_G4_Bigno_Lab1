package com.miniapp.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniapp.backend.models.User;

@Service
public class PasswordService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean verify(User user, String rawPassword) {
        if (user == null || rawPassword == null) return false;
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }
}
