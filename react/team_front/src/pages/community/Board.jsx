import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Board.css'
import { Container } from 'react-bootstrap'
import axiosInstance from "../../axios/axiosInstance"

const Board = () => {
  const navigate = useNavigate()
  const [BoardList, setBoardList] = useState([
    {
      id: 1,
      title: "새로운 커피 원두 '에티오피아 예가체프' 입고 안내",
      author: "운영자",
      createDate: "2024-09-02",
    },
    {
      id: 2,
      title: "가을 한정 메뉴 '밤 라떼' 출시!",
      author: "운영자",
      createDate: "2024-08-28",
    },
    {
      id: 3,
      title: "MD 상품 '룸코너 머그컵' 재입고 완료",
      author: "운영자",
      createDate: "2024-08-25",
    },
    {
      id: 4,
      title: "텀블러 사용 시 할인 이벤트 안내",
      author: "운영자",
      createDate: "2024-08-20",
    },
    {
      id: 5,
      title: "사이트 점검에 따른 임시 서비스 중단 안내 (9/5 새벽 2시)",
      author: "운영자",
      createDate: "2024-09-01",
    },
    {
      id: 6,
      title: "게시판 기능 업데이트 완료! 사진 첨부 가능",
      author: "운영자",
      createDate: "2024-08-30",
    },
  ]);

  useEffect(()=>{
    axiosInstance
      .get('/board/BOARD')
      .then(response=>{
        console.log(response)
        setBoardList(response.data)
      })
      .catch(error=>{console.error(error)})
  }, [])

  if (!BoardList)
    return (
      <Container>
        <h1>게시글 없음</h1>
      </Container>
    )

  return (

    <div className="board-container">
      <h1>게시판</h1>

      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            BoardList.map((board, i) => (
              <tr key={i}>
                <td>{board.id}</td>
                <td><Link to={`/board/${board.id}`} style={{textDecoration:`none`, color: `inherit`}}>{board.title}</Link></td>
                <td>{board.memberName}</td>
                <td>{board.createDate}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="board-write-container" onClick={() => { navigate("/write?from=board") }}>
        <Link className="board-write-button">등록</Link>
      </div>
    </div>
  )
}

export default Board