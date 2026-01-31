package com.spring.main.upload;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "imagefile")
@Entity
public class ImageFile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String fileName; // 실제 저장된 파일명
	
	private String filePath; // 업로드 경로 /uploads/... (application.properties)
	
	private String uuid;
	
	@Column(unique=true)
	private String url; // /images/...
	
	@CreationTimestamp
	private LocalDateTime uploadAt; // 업로드 시각
	
}
