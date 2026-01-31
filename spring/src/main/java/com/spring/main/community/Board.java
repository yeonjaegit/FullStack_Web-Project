package com.spring.main.community;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spring.main.member.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
@Entity
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; //번호(기본키)
	
	@Column(nullable = false)
	private String title; //제목
	
	@Lob
	@Column(nullable = false)
	private String content; //내용
	
	@CreationTimestamp
	private LocalDateTime createDate;
	
	@Enumerated(EnumType.STRING)
	private BoardType boardType;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "memberid")
	private Member member; //작성자
	
	@JsonManagedReference
	@OneToMany(mappedBy="board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private List<Reply> replyList; //댓글 목록
}
