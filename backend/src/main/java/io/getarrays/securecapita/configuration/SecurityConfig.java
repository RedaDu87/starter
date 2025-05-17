package io.getarrays.securecapita.configuration;

import io.getarrays.securecapita.filter.CustomAuthorizationFilter;
import io.getarrays.securecapita.handler.CustomAccessDeniedHandler;
import io.getarrays.securecapita.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static io.getarrays.securecapita.constant.Constants.PUBLIC_URLS;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final BCryptPasswordEncoder encoder;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final UserDetailsService userDetailsService;
    private final CustomAuthorizationFilter customAuthorizationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.cors(cors -> cors.configurationSource(corsConfigurationSource())); // 🔥 configure correctement CORS ici
        http.sessionManagement(session -> session.sessionCreationPolicy(STATELESS));
        http.authorizeHttpRequests(request -> request.requestMatchers(PUBLIC_URLS).permitAll());
        http.authorizeHttpRequests(request -> request.requestMatchers(OPTIONS).permitAll());
        http.authorizeHttpRequests(request -> request.requestMatchers(DELETE, "/user/delete/**").hasAnyAuthority("DELETE:USER"));
        http.authorizeHttpRequests(request -> request.requestMatchers(DELETE, "/customer/delete/**").hasAnyAuthority("DELETE:CUSTOMER"));
        http.exceptionHandling(exception -> exception.accessDeniedHandler(customAccessDeniedHandler)
                .authenticationEntryPoint(customAuthenticationEntryPoint));
        http.authorizeHttpRequests(request -> request.anyRequest().authenticated());

        http.addFilterBefore(customAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder);
        return new ProviderManager(authProvider);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:4200",
                "http://coran-hadith.fr",
                "http://api.coran-hadith.fr",
                "https://localhost:4200",
                "https://coran-hadith.fr",
                "https://api.coran-hadith.fr"
        ));
        config.setAllowedHeaders(List.of("*")); // 🔥 autorise tous les headers
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // 🔥 toutes méthodes
        config.setExposedHeaders(List.of(
                "Authorization", "Jwt-Token", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
