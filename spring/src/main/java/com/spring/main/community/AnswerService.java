package com.spring.main.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
	
	@Autowired
	private AnswerRepo answerRepo;
	
	public void postAnswer(Answer answer) {
		answerRepo.save(answer);
	}
	
	public List<Answer> getAllAnswer() {
		List<Answer> answer = answerRepo.findAllByOrderByMemberIdAsc();
		return answer;
	}
	
	public void updateAnswer(int id, Answer answer) {
		Answer updateAnswer = answerRepo.findById(id).get();
		updateAnswer.setContent(answer.getContent());
		
		answerRepo.save(updateAnswer);
	}
	
	public void deleteAnswer(int id) {
		answerRepo.deleteById(id);
	}

}
