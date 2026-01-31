package com.spring.main.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@PostMapping("/board") // 게시글 작성
	public ResponseEntity<?> postBoard(@RequestBody Board board) {
		
		boardService.postBoard(board);
		
		return new ResponseEntity<>("게시글 작성 완료", HttpStatus.OK);
	}
	
	@GetMapping("/board") // 게시글 조회
	public ResponseEntity<List<BoardDTO>> getAllBoard() {
		
		List<BoardDTO> boardDTO = boardService.getAllBoard();
		
		return ResponseEntity.ok(boardDTO);
	}
	
	@GetMapping("/board/{boardtype}")
	public ResponseEntity<List<BoardDTO>> getBoardByType(@PathVariable BoardType boardtype) {
		
		List<BoardDTO> boardDto = boardService.getBoardsByType(boardtype);
		
		return ResponseEntity.ok(boardDto);
	}
	
	@PutMapping("/board/{id}") // 게시글 수정
	public ResponseEntity<?> putBoard(@PathVariable int id, @RequestBody Board board) {
		
		boardService.updateBoard(id, board);
		
		return new ResponseEntity<>("게시글 수정 완료", HttpStatus.OK);
	}
	
	@DeleteMapping("/board/{id}") // 게시글 삭제
	public ResponseEntity<?> deleteBoard(@PathVariable int id) {
		
		boardService.deleteBoard(id);
		
		return new ResponseEntity<>("게시글 삭제 완료", HttpStatus.OK);
	}
}
