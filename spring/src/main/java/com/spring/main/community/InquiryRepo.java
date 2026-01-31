package com.spring.main.community;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepo extends JpaRepository<Inquiry, Integer>{
	List<Inquiry> findAllByOrderByMemberIdAsc();
}
