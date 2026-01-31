package com.spring.main.community;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepo extends JpaRepository<Board, Integer>{
	List<Board> findAllByOrderByBoardTypeAscIdAsc();
	List<Board> findByBoardTypeOrderByIdDesc(BoardType boardType);
}
