package com.spring.main.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.main.member.Member;
import com.spring.main.member.MemberRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
	private final MemberRepo memberRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member principal=memberRepo.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException(username+"는 존재하지 않는 유저입니다."));
		
		return new UserDetailsImpl(principal); //인터페이스가 리턴 조건이므로 구현객체를 반환
	}
}