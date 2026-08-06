package com.ipn.dashboard.controller;

import com.ipn.dashboard.dto.LoginRequest;
import com.ipn.dashboard.dto.RegisterRequest;
import com.ipn.dashboard.dto.UserResponse;
import com.ipn.dashboard.model.User;
import com.ipn.dashboard.repository.UserRepository;
import com.ipn.dashboard.security.AuthenticatedUser;
import com.ipn.dashboard.security.CookieUtil;
import com.ipn.dashboard.security.JwtService;
import com.ipn.dashboard.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final CookieUtil cookieUtil;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, JwtService jwtService, CookieUtil cookieUtil, UserRepository userRepository) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.cookieUtil = cookieUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);
        String token = jwtService.generateToken(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookieUtil.buildAuthCookie(token).toString())
                .body(UserResponse.from(user));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = authService.login(request);
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookieUtil.buildAuthCookie(token).toString())
                .body(UserResponse.from(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookieUtil.buildLogoutCookie().toString())
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {
        AuthenticatedUser principal = (AuthenticatedUser) authentication.getPrincipal();
        User user = userRepository.findById(principal.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
