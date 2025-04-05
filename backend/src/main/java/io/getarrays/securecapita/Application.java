package io.getarrays.securecapita;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;
import java.util.Arrays;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (https://getarrays.io)
 * @since 8/22/2022
 */

@SpringBootApplication//(exclude = { SecurityAutoConfiguration.class })
public class Application {
	private static final int STRENGHT = 12;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(STRENGHT);
	}

	@Configuration
	public class CorsConfig {

		@Bean
		public CorsFilter corsFilter() {
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			CorsConfiguration config = new CorsConfiguration();

			config.setAllowCredentials(true);
			config.setAllowedOrigins(List.of(
					"http://vps-27d6c134.vps.ovh.net:4200",
					"http://vps-27d6c134.vps.ovh.net:8080",
					"http://vps-27d6c134.vps.ovh.net:3000",
					"http://coran-hadith.fr"
			));
			config.setAllowedHeaders(List.of(
					"Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
					"X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"
			));
			config.setExposedHeaders(List.of(
					"Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
					"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "File-Name"
			));
			config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

			source.registerCorsConfiguration("/**", config);
			return new CorsFilter(source);
		}
	}


}