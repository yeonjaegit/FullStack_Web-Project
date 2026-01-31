package com.spring.main.community;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.main.member.Member;
import com.spring.main.member.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class InquiryController {
	private final InquiryService inquiryService;
	private final MemberService memberService;
	
	@PostMapping("/inquiry")
	public ResponseEntity<?> postInquiry(@RequestBody Inquiry inquiry) {
		int memberId = inquiry.getMember().getId();
		Member member = memberService.getMember(memberId);
		Inquiry _inquiry = Inquiry
				.builder()
				.title(inquiry.getTitle())
				.content(inquiry.getContent())
				.member(member)
				.build();
		inquiryService.postInquiry(_inquiry);
		return new ResponseEntity<>("게시글 작성 완료", HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<?> getInquiry(@RequestParam int id) {
		InquiryDTO inquiryDto=inquiryService.get(id);
		
		return new ResponseEntity<>(inquiryDto, HttpStatus.OK);
	}
	
	@PutMapping("/inquiry/{id}")
	public ResponseEntity<?> putInquiry(@PathVariable int id, @RequestBody Inquiry inquiry) {
		inquiryService.updateInquiry(id, inquiry);
		return new ResponseEntity<>("문의글 수정 완료", HttpStatus.OK);
	}
	
	@DeleteMapping("/inquiry/{id}")
	public ResponseEntity<?> deleteInquiry(@PathVariable int id) {
		inquiryService.deleteInquiry(id);
		return new ResponseEntity<>("문의글 삭제 완료", HttpStatus.OK);
	}
}
