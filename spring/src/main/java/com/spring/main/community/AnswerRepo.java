package com.spring.main.community;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepo extends JpaRepository<Answer, Integer>{
	List<Answer> findAllByOrderByMemberIdAsc();
}
