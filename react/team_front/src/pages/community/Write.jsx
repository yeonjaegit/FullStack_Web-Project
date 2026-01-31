import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from "react-router-dom"
import './Write.css'
import { useEffect, useRef, useState } from "react"
import axiosInstance from "../../axios/axiosInstance"
import { jwtDecode } from "jwt-decode"

const Write = ({ userInfo }) => {
  const navigate = useNavigate()
  const titleRef = useRef()
  const contentRef = useRef()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [writeFrom, setWriteFrom] = useState()

  const [backPath, setBackPath] = useState("/board")

  function submitHandler(e) {
    e.preventDefault()
    const jwt = sessionStorage.getItem('jwt')
    if (!jwt) {
      console.error('jwt must not be null')
      return
    }

    if (writeFrom === "board") {
      const board = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        member: { id: jwtDecode(jwt).id },
        boardType: "BOARD",
      }
      if (confirm("글 작성을 완료하시겠습니까?"))
        axiosInstance.post('/board', board)
          .then(response => {
            console.log(response)
            navigate("/board") //?
          })
          .catch(error => {
            console.error(error)
          })
    } else if (writeFrom === "inquiry") {
      const inquiry = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        member: { id: jwtDecode(jwt).id },
      }
      if (confirm("글 작성을 완료하시겠습니까?"))
        axiosInstance.post('/inquiry', inquiry)
          .then(response => {
            console.log(response)
            navigate("/inquiry") //?
          })
          .catch(error => {
            console.error(error)
          })
    } else if (writeFrom === "notice") {
      const board = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        member: { id: jwtDecode(jwt).id },
        boardType: "NOTICE",
      }
      if (confirm("글 작성을 완료하시겠습니까?"))
        axiosInstance.post('/board', board)
          .then(response => {
            console.log(response)
            navigate("/notice") //?
          })
          .catch(error => {
            console.error(error)
          })
    } else {
      alert("잘못된 접근")
      navigate("/")
    }

  }

  useEffect(() => {
    setWriteFrom(queryParams.get("from"))
    // alert(writeFrom)
    if (writeFrom == "inquiry") {
      setBackPath("/inquiry")
    } else if (writeFrom == "board") {
      setBackPath("/board")
    } else {
      setBackPath("/notice")
    }
  }, [])

  if (!writeFrom) {
    return (
      <div>
        <h1>페이지 로딩중...</h1>
      </div>
    )
  }

  return (
    <div>
      <Container>
        <Row><Col><h1>{writeFrom}</h1></Col></Row>
        <InputGroup>
          <InputGroup.Text >제목</InputGroup.Text>
          <Form.Control ref={titleRef} />
        </InputGroup>
        <ReactQuill ref={contentRef} theme="snow" />
        <Button onClick={submitHandler}>저장</Button>
        <Button onClick={() => { navigate(backPath) }}>취소</Button>
      </Container>
    </div>
  )
}

export default Write