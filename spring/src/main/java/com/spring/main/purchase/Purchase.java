package com.spring.main.purchase;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.spring.main.member.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "purchase")
@Entity
public class Purchase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // 요청id
	
	@Column(nullable = false)
	private int totalAmount; // 총 가격
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusType status; // 거래 상태
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MethodType method; // 거래 수단
	
	@Column(nullable = false)
	private String paymentInfo; // 거래 정보 
	
	@CreationTimestamp
	private LocalDateTime time; // 요청 시간
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	
	
	
	
	
	
	
	
	
	
}
