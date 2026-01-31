import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosMember from '../../axios/axiosMember'

function Login(){
  const idRef=useRef()
  const pwRef=useRef()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const windowSize = useSelector(state => state.windowSize)
  const titleStyle={
    textAlign:'center'
  }
  const containerStyle={
    border: '1px solid black',
    borderRadius: '5px',
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
  }
  const loginDivStyle={
    padding:'30px'
  }

  function loginHandler(e){
    e.preventDefault()
    const user={
      username:idRef.current.value,
      password:pwRef.current.value,
    }
    axiosMember.login(dispatch, user, ()=>{navigate("/")})
  }
  return (
    <div className="Login" style={loginDivStyle}>
      <Container style={containerStyle}>
        <Row className="mt-5">
          <Col style={titleStyle}>
            <h1>로그인</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>아이디</InputGroup.Text>
            <Form.Control ref={idRef}
              placeholder="Username"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5">
          <InputGroup>
            <InputGroup.Text style={{width:`20%`}}>비밀번호</InputGroup.Text>
            <Form.Control ref={pwRef} type='password'
              placeholder="Password"
            />
          </InputGroup>
        </Row>
        <Row className="mt-5 mb-3">
          <Col xs={6} style={{textAlign:`center`}}>
            <Button style={{width:`70%`}} onClick={loginHandler}>로그인</Button>
          </Col>
          <Col xs={6} style={{textAlign:`center`}}>
            <Button style={{width:`70%`}} onClick={()=>{navigate('/signup')}}>회원가입</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Login