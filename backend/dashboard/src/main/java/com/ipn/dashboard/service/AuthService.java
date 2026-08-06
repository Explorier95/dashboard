package com.ipn.dashboard.service;

import com.ipn.dashboard.dto.LoginRequest;
import com.ipn.dashboard.dto.RegisterRequest;
import com.ipn.dashboard.model.Role;
import com.ipn.dashboard.model.User;
import com.ipn.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String teacherRegistrationCode;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${security.teacher-registration-code}") String teacherRegistrationCode
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.teacherRegistrationCode = teacherRegistrationCode;
    }

    public User register(RegisterRequest request) {
        if (request.role() == Role.TEACHER
                && (request.teacherCode() == null || !request.teacherCode().equals(teacherRegistrationCode))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungueltiger Lehrer-Registrierungscode.");
        }
        if (userRepository.existsByUsernameIgnoreCase(request.username())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Benutzername ist bereits vergeben.");
        }
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-Mail ist bereits registriert.");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        user.setDisplayName(
                request.displayName() != null && !request.displayName().isBlank()
                        ? request.displayName()
                        : request.username()
        );
        user.setSchoolClass(request.schoolClass());

        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            // Backstop gegen die Race Condition zweier gleichzeitiger Registrierungen mit demselben Namen.
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Benutzername oder E-Mail ist bereits vergeben.");
        }
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByUsernameIgnoreCase(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Ungueltiger Benutzername oder Passwort."));

        if (!user.isEnabled() || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Ungueltiger Benutzername oder Passwort.");
        }
        return user;
    }
}
