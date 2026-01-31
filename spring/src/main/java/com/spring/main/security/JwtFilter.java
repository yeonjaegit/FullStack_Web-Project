package com.spring.main.security;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * 로그인하지 않은 사용자가 요청시 로그인페이지로 넘겨줄 수 있도록 처리 
 */
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter{
	private final JwtService jwtService;
	
	/**
	 * 요청이 컨트롤러로 들어가기 전에 작동하는 메소드
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("RES_"+response.getHeader(HttpHeaders.AUTHORIZATION));
		String jwt=jwtService.resolveToken(request); //토큰 추출
		boolean check=jwtService.validate(jwt); //토큰검사
		System.out.println("jwt "+jwt);
		if(check) {
			String username=jwtService.getUsername(jwt);
			List<? extends GrantedAuthority> roles=jwtService.getAuthroities(jwt); 
			Authentication auth=new UsernamePasswordAuthenticationToken(username, null, roles); //null은 credential 자리
			
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		filterChain.doFilter(request, response);
	}
}
