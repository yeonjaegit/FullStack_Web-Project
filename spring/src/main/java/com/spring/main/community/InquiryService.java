package com.spring.main.community;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiryService {
	private final InquiryRepo inquiryRepo;
	
	public void postInquiry(Inquiry inquiry) {
		inquiryRepo.save(inquiry);
	}
	
	public InquiryDTO get(int id) {
		Inquiry inquiry=inquiryRepo.findById(id).orElseGet(()->new Inquiry());
		InquiryDTO inquiryDto=InquiryDTO.builder()
				.id(inquiry.getId())
				.title(inquiry.getTitle())
				.content(inquiry.getContent())
				.createDate(inquiry.getCreateDate())
				.inquiryWriter(inquiry.getMember().getUsername())
				.answerId(inquiry.getAnswer().getId())
				.answerContent(inquiry.getAnswer().getContent())
				.answerCreateDate(inquiry.getAnswer().getCreateDate())
				.answerWriter(inquiry.getAnswer().getMember().getUsername())
				.build();
		return inquiryDto;
	}
	
	public void updateInquiry(int id, Inquiry inquiry) {
		Inquiry updateInquiry = inquiryRepo.findById(id).get();
		updateInquiry.setTitle(inquiry.getTitle());
		updateInquiry.setContent(inquiry.getContent());
		
		inquiryRepo.save(updateInquiry);
	}
	
	public void deleteInquiry(int id) {
		inquiryRepo.deleteById(id);
	}
}
