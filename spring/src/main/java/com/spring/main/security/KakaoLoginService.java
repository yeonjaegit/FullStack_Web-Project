package com.spring.main.security;

public class KakaoLoginService {

}

/* pending
//https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api - "토큰 요청" 참고
@Service
public class KakaoLoginService {
	@Value("${kakao.default.password}")
	private String kakaoPassword; 
	
	public String getAccessToken(String code) {
		//Header
		HttpHeaders header=new HttpHeaders(); //Map과 같은 구조. key-value로 헤더를 받아옴.
		header.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		
		//Body.. 보통 Map으로 만들어 쓰지만, MultiValueMap이 popular
		//MultiValueMap은 key 하나에 여러 Value를 매핑할 수 있다. Map은 1:1.
		MultiValueMap<String, String> body=new LinkedMultiValueMap<>();
		body.add("grant_type", "authorization_code");
		body.add("client_id", "6920dfb189bcb783201d9a46422fd335");
		body.add("redirect_uri", "http://localhost:8888/oauth/kakao");
		body.add("code", code); //코드는 고정이 아님. 받아서 쓰도록 해야 함.
		
		//요청객체. 순서 주의
		HttpEntity<MultiValueMap<String, String>> requestEntity=new HttpEntity<>(body, header);
		
		//요청 및 응답 교환
		RestTemplate restTemplate=new RestTemplate();
		ResponseEntity<String> responseEntity=restTemplate.exchange(
			"https://kauth.kakao.com/oauth/token",
			HttpMethod.POST,
			requestEntity,
			String.class //응답데이터 문자열로 수신
		);
		
		//위에서 String.class를 Map.class로 넘겨줄 수도 있지만 generic을 사용하지 못한다고 함.
		//String으로 필요한 토큰을 추출하기는 골치아프니 GSON을 사용한다고. 
		String jsonString=responseEntity.getBody();
		
		Gson gson=new Gson();
		Map<?, ?> data=gson.fromJson(jsonString, Map.class); //문자열을 Object가 담긴 map으로 변환.
		
//		for(Object key:data.keySet()) {
//			System.out.println(key+" : "+data.get(key));
//		}
		
//		return responseEntity.getBody(); //응답의 body만 받아서 처리
		
		//Object > String 형변환은 특이하네
		return (String) data.get("access_token");
	}
	
	//사용자 정보 조회
	//https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
	public User getUserInfo(String accessToken) {
		//Header
		HttpHeaders header=new HttpHeaders();
		header.add("Authorization", "Bearer "+accessToken);
		header.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		
		//Request Object
		HttpEntity<MultiValueMap<String, String>> requestEntity=new HttpEntity<>(header);
		
		RestTemplate restTemplate=new RestTemplate();
		ResponseEntity<String> responseEntity=restTemplate.exchange(
			"https://kapi.kakao.com/v2/user/me",
			HttpMethod.GET,
			requestEntity,
			String.class
		);
		
		String jsonString=responseEntity.getBody();
		
		Gson gson=new Gson();
		Map<?, ?> data=gson.fromJson(jsonString, Map.class);
		
		for(Object key:data.keySet()) {
			System.out.println(key+" : "+data.get(key));
		}
		
//		Double id=(Double)data.get("id");
//		Map<?, ?> properties=(Map<?, ?>)data.get("properties");
//		String nickname=(String)properties.get("nickname");
//		String profileImage=(String)properties.get("profile_image");
//		String thumbnailImage=(String)properties.get("thumbnail_image");
		
		Map<?, ?> kakaoAccount=(Map<?, ?>)data.get("kakao_account");
		Map<?, ?> profile=(Map<?, ?>)kakaoAccount.get("profile");
		String nickname2=(String)profile.get("nickname");
//		String profileImageUrl=(String)profile.get("profile_image_url");
//		String thumbnailImageUrl=(String)profile.get("thumbnail_image_url");
		String email=(String)kakaoAccount.get("email");
		
		/*
		 * kakao_account : {
		 * 	profile_nickname_needs_agreement=false, 
		 * 	profile_image_needs_agreement=false, 
		 * 	profile={
		 * 		nickname=Ch, 
		 * 		thumbnail_image_url=http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg, 
		 * 		profile_image_url=http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg, 
		 * 		is_default_image=true, 
		 * 		is_default_nickname=false}, 
		 * 		has_email=true, 
		 * 		email_needs_agreement=false, 
		 * 		is_email_valid=true, 
		 * 		is_email_verified=true, 
		 * 		email=chkim77@kakao.com
		 * }
		 */
		
//		User user=User.builder()
//				.username(nickname2)
//				.email(email)
//				.password(kakaoPassword)
//				.role(RoleType.USER)
//				.oauth(OAuthType.KAKAO)
//				.build();
//		
//		return user;
////		return new User();
//	}
//}

