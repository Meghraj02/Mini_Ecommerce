package com.ecommerce.mail_service.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                // Make Spring Security use the CorsConfigurationSource bean below
//                .cors(Customizer.withDefaults())
//                // Disable CSRF for stateless REST endpoints (typical for API backends)
//                .csrf(csrf -> csrf.disable())
//                // Authorization rules
//                .authorizeHttpRequests(auth -> auth
//                        // Allow all requests to your auth controller (login/register)
//                        .requestMatchers("/auth-app/**").permitAll()
//                        // Allow actuator or other endpoints if needed, e.g.:
//                        // .requestMatchers("/actuator/**").permitAll()
//                        // everything else requires authentication
//                        .anyRequest().authenticated()
//                );
//
//        return http.build();
//    }
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                    // Allow mail service endpoints
                    .requestMatchers("/mail-app/**").permitAll()
                    // everything else requires authentication
                    .anyRequest().authenticated()
            );

    return http.build();
}


    /**
     * CORS configuration applied to the application. Spring Security will call this
     * because we used http.cors(...) above.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();

        // Use exact origin(s) for security. If you need patterns, use setAllowedOriginPatterns.
        cfg.setAllowedOrigins(List.of("http://localhost:3005"));

        // Allowed methods & headers
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));

        // If your client will send cookies / session info:
        cfg.setAllowCredentials(true);

        // If you return token in a response header and want the client to read it:
        cfg.setExposedHeaders(List.of("Authorization"));

        cfg.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply to your auth endpoints (and optionally all endpoints)
        source.registerCorsConfiguration("/auth-app/**", cfg);
        source.registerCorsConfiguration("/**", cfg); // optional: apply app-wide
        return source;
    }
}