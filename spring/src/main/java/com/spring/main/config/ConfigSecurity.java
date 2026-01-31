package com.spring.main.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.spring.main.security.AuthEntryPoint;
import com.spring.main.security.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ConfigSecurity {
	private final JwtFilter jwtFilter;
//	private final OAuth2UserDetailsServiceImpl oAuth2UserDetailsServiceImpl;
	private final AuthEntryPoint authEntryPoint;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.csrf(csrf->csrf.disable())
			.cors(cors->cors.configurationSource(getSource()))
			.exceptionHandling(eh->eh
				.authenticationEntryPoint(authEntryPoint)
				)
			.authorizeHttpRequests(auth->auth
				.requestMatchers(HttpMethod.POST, "/login", "/signup").permitAll()
				.requestMatchers(HttpMethod.GET, "/images/**").permitAll()
				//여기서도 role 관련 권한 설정 가능
				.anyRequest().authenticated()
				)
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//		).formLogin(form->form
//			.loginPage("/login") //기본 로그인페이지가 아닌, 이 엔드포인트로 이동하도록 지정
////				.defaultSuccessUrl("/", true) //로그인 성공시 보낼 url을 지정 가능. true를 붙여야 무조건 이동.
////				.loginProcessingUrl("") //html 등에서 로그인 요청시 따라야 할 요청 URL 지정 가능
////				.usernameParameter("id") //html 폼태그 등에서 수신할 사용자 ID의 name값. default: username 
////				.passwordParameter("pw") //html 폼태그 등에서 수신할 사용자 PW의 name값. default: password
//		).logout(logout->logout
//			.logoutUrl("/logout") //로그아웃 요청 엔드포인트 지정
//			.logoutSuccessUrl("/") //로그아웃 성공시 보낼 url
//		).oauth2Login(oauth2->oauth2 //구글 oauth2 설정
//			.loginPage("/login")
//			.userInfoEndpoint(u->u.userService(oAuth2UserDetailsServiceImpl))
//			.defaultSuccessUrl("/")
//		);
		
//		http.securityContext(sc->sc.requireExplicitSave(false));
		
		return http.build();
	}
	
	CorsConfigurationSource getSource() {
		CorsConfiguration config=new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:5173"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
		config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
		
		UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
	@Bean
	AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
//	@Bean
//	PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
	
}
