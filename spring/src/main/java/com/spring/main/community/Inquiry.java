package com.spring.main.community;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.spring.main.member.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "inquiry")
@Entity
public class Inquiry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // 문의글 번호(기본키)
	
	@Column(nullable = false)
	private String title; // 문의글 제목
	
	@Column(nullable = false)
	private String content; // 문의글 내용
	
	@CreationTimestamp
	private LocalDateTime createDate; // 문의글 작성 일시
	
	@ManyToOne
	@JoinColumn(name = "memberid")
	private Member member;
	
	@OneToOne
	private Answer answer;
	
	
	
	
	
	
	
	
	
	
	
	
}
