package com.spring.main.community;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.main.member.Member;
import com.spring.main.member.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AnswerController {
	private final AnswerService answerService;
	private final MemberService memberService;
//	private final InquiryService inquiryService;
	private final InquiryRepo inquiryRepo;
	
	@PostMapping("/answer") // 답변 작성
	public ResponseEntity<?> postAnswer(@RequestBody Answer answer) {
		int inquiryId=answer.getInquiry().getId();
		int memberId=answer.getMember().getId();
		Inquiry inquiry=inquiryRepo.findById(inquiryId).get();
		Member member=memberService.getMember(memberId);
		Answer _answer=Answer
				.builder()
				.content(answer.getContent())
				.inquiry(inquiry)
				.member(member)
				.build();
		answerService.postAnswer(_answer);
		return new ResponseEntity<>("답변 등록 완료", HttpStatus.OK);
	}
}
