package com.ipn.dashboard.dto;

import com.ipn.dashboard.model.Role;
import com.ipn.dashboard.model.User;

public record UserResponse(
        Integer id,
        String username,
        String email,
        Role role,
        String displayName,
        String schoolClass
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getDisplayName(),
                user.getSchoolClass()
        );
    }
}
