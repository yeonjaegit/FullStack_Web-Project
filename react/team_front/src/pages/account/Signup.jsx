import { useRef } from "react"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import axiosInstance from "../../axios/axiosInstance"
import { useNavigate } from "react-router-dom"
import axiosMember from "../../axios/axiosMember"

function Signup(){
  const idRef=useRef()
  const pwRef=useRef()
  const lastNameRef=useRef()
  const firstNameRef=useRef()
  const emailRef=useRef()
  const navigate=useNavigate()

  const titleStyle={
    textAlign:'center'
  }
  const signupDivStyle={
    padding:`30px`,
  }
  const containerStyle={
    border:`1px solid black`,
    borderRadius:`5px`,
  }
  function signupHandler(e){
    e.preventDefault()
    const user={
      username:idRef.current.value,
      password:pwRef.current.value,
      firstName:firstNameRef.current.value,
      lastName:lastNameRef.current.value,
      email:emailRef.current.value,
    }
    axiosMember.signup(user, ()=>{navigate("/")}, (error)=>{
      alert('회원가입 실패')
      console.log(error.response.data)
    })
  }
  return (
    <div className="Signup" style={signupDivStyle}>
      <Container style={containerStyle}>
        <Row className="mt-5">
          <Col style={titleStyle}>
            <h1>회원가입</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>아이디</InputGroup.Text>
            <Form.Control ref={idRef}
              placeholder="" />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>비밀번호</InputGroup.Text>
            <Form.Control type="password" ref={pwRef}
              placeholder="*****"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>성</InputGroup.Text>
            <Form.Control ref={lastNameRef}
              placeholder="홍"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>이름</InputGroup.Text>
            <Form.Control ref={firstNameRef}
              placeholder="길동"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>이메일</InputGroup.Text>
            <Form.Control ref={emailRef}
              placeholder="example@gmail.com"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <Button onClick={signupHandler}>회원가입 완료</Button>
        </Row>
      </Container>
    </div>
  )
}
export default Signup