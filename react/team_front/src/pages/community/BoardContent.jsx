import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function BoardContent(){
  const navigate=useNavigate()
  const titleStyle={
    textAlign:'center'
  }
  const contentDivStyle={
    padding:`30px`,
  }
  const containerStyle={
    border:`1px solid black`,
    borderRadius:`5px`,
  }

  return (
    <div className="Content" style={contentDivStyle}>
      <Container style={containerStyle}>
        <Row className="mt-5">
          <Col style={titleStyle}>
            <h1>게시판</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>제목</InputGroup.Text>
            <Form.Control
              placeholder="title"
              style={{height: '50px', textAlign: 'center'}}
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>내용</InputGroup.Text>
            <Form.Control type="content"
              as="textarea"
              placeholder="content"
              style={{height: '200px', textAlign: 'center'}}
            />
          </InputGroup>
        </Row>
        <Row className="mt-5 mb-3">
          <Col xs={6} style={{textAlign: `center`}}>
            <Button style={{width: `70%`}}>등록하기</Button>
          </Col>
          <Col xs={6} style={{textAlign: `center`}}>
            <Button style={{width: `70%`}} onClick={() => {navigate('/board')}}>돌아가기</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default BoardContent