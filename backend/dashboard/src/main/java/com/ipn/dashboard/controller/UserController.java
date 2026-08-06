package com.ipn.dashboard.controller;

import com.ipn.dashboard.dto.UserResponse;
import com.ipn.dashboard.model.Role;
import com.ipn.dashboard.model.User;
import com.ipn.dashboard.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Nur fuer Lehrer (siehe SecurityConfig) - z.B. fuer die Schuelerliste im Schuelerfokus.
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<UserResponse> list(@RequestParam(required = false) Role role) {
        List<User> users = role != null
                ? userRepository.findByRoleOrderByDisplayNameAsc(role)
                : userRepository.findAll();
        return users.stream().map(UserResponse::from).toList();
    }
}
