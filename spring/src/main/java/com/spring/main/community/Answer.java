package com.spring.main.community;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.spring.main.member.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
@Table(name = "answer")
@Entity
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Lob
	@Column(nullable = false)
	private String content; // 답변 내용
	
	@CreationTimestamp
	private LocalDateTime createDate; // 답변 일시
	
	@OneToOne
	private Inquiry inquiry;
	
	@OneToOne
	private Member member; //답변자
	
}
