package com.spring.main.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.spring.main.member.Member;
import com.spring.main.member.MemberService;
import com.spring.main.member.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserDetailsServiceImpl extends DefaultOAuth2UserService{
	private final PasswordEncoder passwordEncoder;
	private final MemberService userService;
	
	@Value("${google.default.password}")
	private String googlePassword;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User=super.loadUser(userRequest); 
		
		String id=oAuth2User.getAttribute("sub");
		String email=oAuth2User.getAttribute("email");
		String username=email+"_"+id;
		String password=passwordEncoder.encode(googlePassword);
		
		Member memer_db=userService.getMember(username);
		if (memer_db.getUsername()==null) {
			memer_db.setUsername(username);
			memer_db.setPassword(password);
			memer_db.setEmail(email);
			memer_db.setRole(RoleType.USER);
			memer_db.setOauth(OAuthType.GOOGLE);
		}
		
		userService.insertMember(memer_db);
		
		return new UserDetailsImpl(memer_db, oAuth2User.getAttributes());
	}
}