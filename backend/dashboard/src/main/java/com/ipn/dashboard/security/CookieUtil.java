package com.ipn.dashboard.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class CookieUtil {

    public static final String COOKIE_NAME = "auth_token";

    private final boolean secure;
    private final Duration maxAge;

    public CookieUtil(
            @Value("${security.cookie.secure}") boolean secure,
            @Value("${security.jwt.expiration-minutes}") long expirationMinutes
    ) {
        this.secure = secure;
        this.maxAge = Duration.ofMinutes(expirationMinutes);
    }

    public ResponseCookie buildAuthCookie(String token) {
        return baseCookieBuilder(token, maxAge).build();
    }

    // Must mirror buildAuthCookie's attributes exactly - a mismatch (e.g. different path) means
    // the browser won't recognize this as the "same" cookie and logout silently fails to clear it.
    public ResponseCookie buildLogoutCookie() {
        return baseCookieBuilder("", Duration.ZERO).build();
    }

    private ResponseCookie.ResponseCookieBuilder baseCookieBuilder(String value, Duration age) {
        return ResponseCookie.from(COOKIE_NAME, value)
                .httpOnly(true)
                .secure(secure)
                .sameSite("Lax")
                .path("/")
                .maxAge(age);
    }
}
