package com.spring.main.member;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spring.main.community.Board;
import com.spring.main.community.Inquiry;
import com.spring.main.product.Cart;
import com.spring.main.product.Favorite;
import com.spring.main.purchase.Purchase;
import com.spring.main.security.OAuthType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "member")
@Entity
public class Member {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; // 회원번호(기본키)
	
	@Column(nullable = false, unique=true)
	private String username; // 회원명
	
	@Column(nullable = false)
	private String password; // 회원 비밀번호
	
	@Column(length=100)
	private String firstName; // 이름
	
	@Column(length=100)
	private String lastName; // 성
	
	@Column(nullable = false)
	private String email; // 회원 이메일
	
	@CreationTimestamp
	private LocalDateTime createDate; // 가입 일시
	
	@Enumerated(EnumType.STRING)
	private RoleType role; // 회원 등급
	
	@OneToMany(mappedBy = "member")
	private List<Inquiry> inquiry;

	@JsonManagedReference
	@OneToMany(mappedBy = "member")
	private List<Board> board = new ArrayList<>();
	
	@OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
	private Favorite favorite;
	
	@OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
	private Cart cart;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "member")
	private List<Purchase> purchase = new ArrayList<>();
	
	//소셜로그인 사용자를 분류하기 위해 추가. BOARD: 일반 로그인, KAKAO/GOOGLE: 소셜 로그인
	@Enumerated(EnumType.STRING)
	private OAuthType oauth;
	
	
	
	
	
}