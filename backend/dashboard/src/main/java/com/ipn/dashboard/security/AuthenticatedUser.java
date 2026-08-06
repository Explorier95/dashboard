package com.ipn.dashboard.security;

import com.ipn.dashboard.model.Role;

public record AuthenticatedUser(Integer id, String username, Role role) {}
