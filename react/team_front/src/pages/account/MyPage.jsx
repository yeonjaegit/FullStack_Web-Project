import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../axios/axiosInstance"
import { jwtDecode } from "jwt-decode"

function MyPage({setAuth}) {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const lastNameRef = useRef()
  const firstNameRef = useRef()
  const emailRef = useRef()
  const navigate = useNavigate()
  const [jwt, setJwt]=useState({sub:null, id:null})

  useEffect(()=>{
    setJwt(jwtDecode(sessionStorage.getItem("jwt")))
    console.log(jwt)
  }, [])

  function updateHandler(e) {
    e.preventDefault()
    if(confirm("정말로 수정하시겠습니까?")){
    const user = {
      username:jwt.sub,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
    }
    console.log(user)
    axiosInstance
      .put(`/user/${jwt.id}`, user)
      .then(response => {
        if(response.status==200){
          console.log(response)
          alert("회원정보 수정 완료")
          navigate("/mypage")
        } else{
          alert("회원정보 수정 실패")
        }
      })
      .catch(error => {
        console.error(error)
        alert("회원정보 수정 오류")
      })
    }
  }

  function deleteHandler(e) {
    e.preventDefault()
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      axiosInstance
        .delete(`/user/${jwt.id}`)
        .then(response => {
          if (response.status==200){
            console.log(response)
            navigate("/")
            alert("회원탈퇴 완료")
          } else{
            alert("회원탈퇴 완료")
            sessionStorage.removeItem("jwt")
            setAuth(false)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <div className="MyPage" style={{ padding: `30px` }}>
      <Container style={{ border: `1px solid gray`, borderRadius: `5px` }}>
        <Row className="mt-5">
          <Col style={{ textAlign: `center` }}>
            <h1>내 정보</h1>
          </Col>
        </Row>
        <Row className="mt-5">
        <InputGroup>
          <InputGroup.Text style={{ width: `20%` }}>아이디</InputGroup.Text>
          <Form.Control
            type="text"
            value={jwt.sub}
            disabled
            />
        </InputGroup>
        </Row>
        <Row className="mt-5">
        <InputGroup>
          <InputGroup.Text style={{ width: `20%` }}>새 비밀번호</InputGroup.Text>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="변경할 비밀번호 입력" />
        </InputGroup>
        </Row>
        <Row className="mt-5">
        <InputGroup>
          <InputGroup.Text style={{ width: `20%` }}>성</InputGroup.Text>
          <Form.Control
            type="lastName"
            ref={lastNameRef}
            placeholder="변경할 성 입력" />
        </InputGroup>
        </Row>
        <Row className="mt-5">
        <InputGroup>
          <InputGroup.Text style={{ width: `20%` }}>이름</InputGroup.Text>
          <Form.Control
            type="firstName"
            ref={firstNameRef}
            placeholder="변경할 이름 입력" />
        </InputGroup>
        </Row>
        <Row className="mt-5">
        <InputGroup>
          <InputGroup.Text style={{ width: `20%` }}>새 이메일</InputGroup.Text>
          <Form.Control
            type="email"
            ref={emailRef}
            placeholder="변경할 이메일 입력" />
        </InputGroup>
        </Row>
        <Row className="mt-5">
          <Col xs={4} style={{textAlign: `center`}}>
            <Button style={{width: `100%`}} onClick={updateHandler}>수정하기</Button>
          </Col>
          <Col xs={4} style={{textAlign: `center`}}>
            <Button style={{width: `100%`}} onClick={() => { navigate(-1) }}>돌아가기</Button>
          </Col>
          <Col xs={4} style={{textAlign: `center`}}>
            <Button style={{width: `100%`}} onClick={deleteHandler}>회원탈퇴</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default MyPage