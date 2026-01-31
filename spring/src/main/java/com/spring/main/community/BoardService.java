package com.spring.main.community;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

	@Autowired
	private BoardRepo boardRepo;

	public void postBoard(Board board) {
		
		boardRepo.save(board);
	}
	
	public List<BoardDTO> getAllBoard() {
		return boardRepo.findAllByOrderByBoardTypeAscIdAsc()
				.stream()
				.map(board -> BoardDTO.builder()
						.id(board.getId())
						.title(board.getTitle())
						.content(board.getContent())
						.boardType(board.getBoardType())
						.createDate(board.getCreateDate())
						.memberName(board.getMember().getUsername())
						.build()
						)
						.collect(Collectors.toList());
	}
	
	public List<BoardDTO> getBoardsByType(BoardType boardType) {
        return boardRepo.findByBoardTypeOrderByIdDesc(boardType) // BoardRepo에서 메서드 필요
                .stream()
                .map(board -> BoardDTO.builder()
                        .id(board.getId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .boardType(board.getBoardType())
                        .createDate(board.getCreateDate())
                        .memberName(board.getMember().getUsername())
                        .build()
                )
                .collect(Collectors.toList());
    }
	
	public void updateBoard(int id, Board board) {
		Board updateBoard = boardRepo.findById(id).get();
		updateBoard.setTitle(board.getTitle());
		updateBoard.setContent(board.getContent());
		updateBoard.setBoardType(board.getBoardType());
		
		boardRepo.save(updateBoard);
	}
	
	public void deleteBoard(int id) {
		boardRepo.deleteById(id);
	}
	
}
