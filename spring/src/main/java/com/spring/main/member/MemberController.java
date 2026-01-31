package com.spring.main.member;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.main.security.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	@PostMapping("/signup") // 회원가입
	public ResponseEntity<?> join(@RequestBody Member member) {
		if (memberService.getMember(member.getUsername()).getUsername()!=null) {
			return new ResponseEntity<>("이미 존재하는 회원정보입니다.", HttpStatus.BAD_REQUEST); 
		} else {
			memberService.insertMember(member);
			return new ResponseEntity<>("회원가입 완료잉", HttpStatus.OK);
		}
	}
	
	@PostMapping("/login") // 로그인
	public ResponseEntity<?> login(@RequestBody Member member) {
		UsernamePasswordAuthenticationToken cred=new UsernamePasswordAuthenticationToken(member.getUsername(), member.getPassword());
		Authentication auth=authenticationManager.authenticate(cred); //AuthenticationProvider - UserDetailsService - UserDetails를 거쳐 ID/PW를 확인하고, 인증 성공하면 인증객체를 반환해줌.
		String jwt=jwtService.createToken(auth.getName(), auth.getAuthorities());
		return ResponseEntity.ok()
				.header(HttpHeaders.AUTHORIZATION, "Bearer "+jwt)
				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization") //CORS문제 발생 대비해서 헤더정보 읽기 허용시킴
				.header("Role", memberService.getRole(member.getUsername()).name())
				.body("로그인 성공");
	}
	
	@PutMapping("/user/{id}") // 회원 정보 수정
	public ResponseEntity<?> putUser(@PathVariable int id, @RequestBody Member member) {
		Member updateMember=memberService.updataMember(id, member);
		if (updateMember.getUsername()!=null) {
			return new ResponseEntity<>("수정 완료", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("회원정보 수정 실패", HttpStatus.BAD_REQUEST);
		}
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/user/{id}") // 회원 정보 삭제
	public ResponseEntity<?> deleteUser(@PathVariable int id) {
		
		memberService.deleteMember(id);
		
		return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	}