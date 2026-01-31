package com.spring.main.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepo memberRepo;
	private final PasswordEncoder passwordEncoder;
	
	public Member getMember(String username) {
		return memberRepo.findByUsername(username).orElseGet(()->new Member());
	}
	
	public Member getMember(int id) {
		return memberRepo.findById(id).orElseGet(()->new Member());
	}
	
	public void insertMember(Member member) {
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		member.setRole(RoleType.USER);
		memberRepo.save(member);
	}

	@Transactional
	public Member updataMember(int id, Member member) {
		Member updateMember = memberRepo.findById(id).orElseGet(()->new Member());
		if (updateMember.getUsername()!=null) {
			String password=member.getPassword();
			String firstName=member.getFirstName();
			String lastName=member.getLastName();
			String email=member.getEmail();
			
			if (!password.equals("") && password!=null)
				updateMember.setPassword(
						passwordEncoder.encode(member.getPassword())
						);
			if (!firstName.equals("") && password!=null)
				updateMember.setFirstName(member.getFirstName());
			if (!lastName.equals("") && password!=null)
				updateMember.setLastName(member.getLastName());
			if (!email.equals("") && password!=null)
				updateMember.setEmail(member.getEmail());
			return memberRepo.save(updateMember);
		} else {
			return updateMember;
		}
	}
	
	public void deleteMember(int id) {
		memberRepo.deleteById(id);
	}

	/**
	 * RoleType 처리 메소드
	 */
	public RoleType getRole(String username) {
		Member member=memberRepo.findByUsername(username).orElseGet(()->new Member());
		return member.getRole();
	}
}
