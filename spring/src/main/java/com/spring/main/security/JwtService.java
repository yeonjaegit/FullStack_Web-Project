package com.spring.main.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import com.spring.main.member.Member;
import com.spring.main.member.MemberService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {
	private final MemberService memberService;
	
   // 토큰 만료 시간 (ms)
   static final long EXPIRATIONTIME = 24 * 60 * 60 * 1000; //1일
   
   // 토큰 타입
   static final String PREFIX = "Bearer ";
   
   // 임시 서명 키
   // SIG.HS256: 키 방식 > HMAC SHAR256
   static final SecretKey KEY = Jwts.SIG.HS256.key().build(); //무작위 비밀키 자동생성
   
   //권한 관련 클레임 키
   //고정된 상수로 처리
   static final String ROLES_CLAIM = "roles";
   
   static final String ID_CLAIM = "id";
   
   public String createToken(String username, Collection<? extends GrantedAuthority> authorities) {
	   
	   Member member=memberService.getMember(username);
	   //발급시간
	   Date now=new Date();
	   //만료시간
	   Date exp=new Date(now.getTime()+EXPIRATIONTIME);
	   
	   List<String> roles=(authorities==null)
			   ?List.of() //권한정보가 없으면 빈 리스트 반환
			   :authorities //권한정보
			   	.stream()
			   	.map(GrantedAuthority::getAuthority) //하나하나 권한을 받음
			    .toList(); //리스트로 만듦
	   return Jwts //교재 384~5p 7가지 JWT 클레임(정보를 담은 속성). JWT String을 만들어줌.
			   .builder()
			   .subject(username) //sub
			   .issuedAt(now) //iss
			   .expiration(exp) //exp
			   .signWith(KEY) //서명
			   .claim(ID_CLAIM, member.getId())
			   .claim(ROLES_CLAIM, roles) //클레임 키로 권한을 담아주기로 함. 커스텀 클레임
			   .compact(); //최종적으로 키 생성
   }
   
   /**
    * 요청객체에서 헤더에 Authorization에 있는 토큰을 추출해주는 메소드
    * JWT는 토큰을 헤더에 담아서 주고받고 있다.
    */
   public String resolveToken(HttpServletRequest request) {
	   String header=request.getHeader(HttpHeaders.AUTHORIZATION);
	   
	   //요청의 헤더정보에서 AUTHORIZATION부분을 받아서 그 문자열이 PREFIX(=="Bearer ")로 시작하는지 확인.
	   if(header!=null && header.startsWith(PREFIX)) {
		   return header.substring(PREFIX.length()).trim(); //"Bearer " 다음 문자의 인덱스부터 시작. PREFIX가 7글자이므로 잘라내어줌. 추가로 양쪽 공백 제거
	   } else return null;
   }
   
   /**
    * 토큰 유효성검사 메소드
    */
   public boolean validate(String token) {
	   if (token==null || token.isBlank())
		   return false;
	   try {
		   	Jwts
			   	.parser()
			   	.verifyWith(KEY) //서명 지정
			   	.clockSkewSeconds(30) //선택사항. 30초정도의 오차 허용
			   	.build()
			   	.parseSignedClaims(token); //검증
		   	return true;
	   } catch(ExpiredJwtException e) {
		   return false; //만료시
	   } catch(JwtException e) {
		   return false; //서명, 형식 등 검증 실패시
	   } catch(Exception e) {
		   return false; //기타 예외
	   } //세분화시켜서 처리하므로 일단 finally 생략
   }
   
   public String getUsername(String token) {
	   Claims claims=Jwts.parser()
			   			 .verifyWith(KEY)
			   			 .build()
			   			 .parseSignedClaims(token)
			   			 .getPayload();
	   return claims.getSubject();
   }
   
   /**
    * 토큰에서 권한(role)을 꺼내주는 메소드
    */
   public List<? extends GrantedAuthority> getAuthroities(String token){
	   Claims claims=Jwts.parser()
	   			 .verifyWith(KEY)
	   			 .build()
	   			 .parseSignedClaims(token)
	   			 .getPayload();
	   
	   //Custom claim으로 넣어준 것은 key-value로 받아와야 한다.
	   //아래처럼 변환하면 자료형 문제가 생긴다.
//		   List<?> list=(List<GrantedAuthority>) raw;
//		   return list;
	   Object raw=claims.get(ROLES_CLAIM);
	   if (raw instanceof List<?> list) { //리스트형태로 저장됨
		   return list
				   .stream()
				   .filter(String.class::isInstance) //list 안의 데이터들중에 String(또는 그 계열, e.g., Object) 인 것(조건문이 참인 것)들을 취함
				   .map(String.class::cast) //String으로 형변환해주는 함수를 mapping
				   .map(SimpleGrantedAuthority::new) //권한(간략화된)으로 만들어줌
				   .collect(Collectors.toList()); //처리된 것들을 모아서 새로운 리스트로 만듦
	   } else return List.of(); //리스트로 변환할 수 없을 경우 빈 리스트 반환
	   
   }
}
