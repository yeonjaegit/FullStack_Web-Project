package com.spring.main.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.spring.main.member.Member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails, OAuth2User{
	private static final long serialVersionUID = 1L;
	
	private Member member;
	
	private Map<String, Object> attributes;
	
	public UserDetailsImpl(Member member) {
		this.member=member;
	}
	public UserDetailsImpl(Member member, Map<String, Object> attributes) {
		this.member=member;
		this.attributes=attributes;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> roleList=new ArrayList<>();
		
		roleList.add(()->{
			return "ROLE_"+member.getRole();
		});
		
		return roleList;
	}
	
	@Override
	public String getPassword() {
	//		return "{noop}"+user.getPassword();
		return member.getPassword(); //암호화된 정보가 넘어온 상태
	}
	
	@Override
	public String getUsername() {
		return member.getUsername();
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}
	@Override
	public <A> A getAttribute(String name) {
		return OAuth2User.super.getAttribute(name);
	}
	
	@Override
	public String getName() {
		return this.getUsername();
	}
		
}