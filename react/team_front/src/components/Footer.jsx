import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function Footer() {
  const footerRef=useRef()
  const navigate = useNavigate()
  const windowSize=useSelector(state=>state.windowSize)
  const isExt = windowSize.width > 1300
  const isMid = windowSize.width > 768 && windowSize.width <= 1300

  const footerStyle={
    marginBottom:"30px", 
    paddingTop:"30px",
    borderTop:"2px solid lightgray",
  }

  return (
    <div className="Footer" ref={footerRef} style={footerStyle}>
      <Container>
        <Row>
          <Col xs={2}>
            <img 
              src={`${import.meta.env.BASE_URL}img/logo.png`} 
              alt='Logo' 
              width={'140px'} 
              height={'140px'}
            />
          </Col>
          <Col xs={ isExt? 4 : isMid? 8 : 10} style={{ padding:"0 10% 0 10%" }}>
            <p>주소 : <br/> 서울특별시 강동구 천호대로 157길 14</p>
            <p>Email :<br/> roomcornercafe@gamil.com</p>
            <p>전화번호 :<br/> 02-2453-7462</p>
          </Col>
          { isExt &&
          <Col xs={6}>
            <Row className="justify-content-center">
              <Col xs="auto" className="text-center">
                <h6>회사 소개</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item action onClick={() => navigate("/history")}>회사 연혁</ListGroup.Item>
                  <ListGroup.Item action onClick={() => navigate("/locate")}>매장 위치</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col xs="auto" className="text-center">
                <h6>커피 메뉴</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item action onClick={() => navigate("/category?menu=에스프레소")}>에스프레소</ListGroup.Item>
                  <ListGroup.Item action onClick={() => navigate("/category?menu=브루잉")}>브루잉</ListGroup.Item>
                  <ListGroup.Item action onClick={() => navigate("/category?menu=블렌디드")}>블렌디드</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col xs="auto" className="text-center">
                <h6>커뮤니티</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item action onClick={() => navigate("/notice")}>공지사항</ListGroup.Item>
                  <ListGroup.Item action onClick={() => navigate("/board")}>게시판</ListGroup.Item>
                  <ListGroup.Item action onClick={() => navigate("/inquiry")}>1:1 문의</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>
          }
        </Row>
      </Container>
    </div>
  )
}

export default Footer