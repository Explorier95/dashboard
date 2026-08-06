package com.ipn.dashboard.config;

import com.ipn.dashboard.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Stateless JWT-Cookie-Auth statt Sessions. CSRF-Schutz laeuft ueber SameSite=Lax
                // (Cookie wird bei Cross-Site fetch/XHR nicht mitgeschickt - der einzige Schreibweg
                // dieser SPA, keine <form>-POSTs) + die CORS-Allowlist unten, nicht ueber einen
                // klassischen CSRF-Token.
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Spring Boots eigene Fehlerbehandlung dispatcht intern nach /error (u.a.
                        // ausgeloest durch sendError() bei ResponseStatusException). Ohne permitAll
                        // hier wuerde dieser zweite, interne Durchlauf durch die Filterkette (mit
                        // bereits geleertem SecurityContext) faelschlich 401 statt des eigentlichen
                        // Fehlerstatus (z.B. 400/404) liefern.
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/logout").permitAll()
                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers("/api/chat/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/evaluations/me").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.GET, "/api/evaluations").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.POST, "/api/evaluations").hasRole("TEACHER")
                        .requestMatchers("/api/aufgabenpool/**").hasRole("TEACHER")
                        .requestMatchers("/api/knowledgebase/**").hasRole("TEACHER")
                        .requestMatchers("/api/avs/**").hasRole("TEACHER")
                        .anyRequest().authenticated()
                )
                // setStatus() statt sendError(): sendError() loest in Tomcat einen internen
                // Error-Dispatch aus, der die Filterkette ein zweites Mal durchlaeuft. Da
                // JwtAuthenticationFilter als OncePerRequestFilter bei diesem Error-Dispatch
                // bewusst nicht erneut laeuft und der SecurityContext zwischen den Durchlaeufen
                // geleert wird, wuerde der zweite Durchlauf faelschlich einen 401 statt des
                // korrekten 403 produzieren.
                .exceptionHandling(eh -> eh
                        .authenticationEntryPoint((req, res, ex) -> res.setStatus(401))
                        .accessDeniedHandler((req, res, ex) -> res.setStatus(403))
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
