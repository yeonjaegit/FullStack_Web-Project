import { useRef, useState } from "react"
import { Button, Container, Form, Modal, Row } from "react-bootstrap"
import axiosInstance from "../axios/axiosInstance"

function Administration() {
  const multipleImgRef = useRef()
  const multiplePathRef = useRef()
  const [showImageListModal, setShowImageListModal] = useState(false);
  const handleShowImageListModal = () => setShowImageListModal(true);
  const handleCloseImageListModal = () => setShowImageListModal(false);
  /**
   * handles image(s) to submit
   * @param {*} ref 
   * @param {*} pathRef 
   * @returns 
   */
  const handleImagesSubmit = (ref, pathRef) => {
    return (e) => {
      e.preventDefault();
      const files = [...ref.current.files]
      console.log(files)
      const fd = new FormData()
      files.forEach(file => { fd.append('files', file) })
      axiosInstance.post('/images', fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          "path": pathRef.current.value
        }
      })
        .then(response => {
          if (response.status==200){
            alert("업로드 성공")
            console.log(response)
          }
        })
        .catch(error => {
          alert("업로드 실패")
          console.error(error)
        })
    }
  }
  function pathRefFormatter(e) {
    const len = e.target.value.length
    const value = e.target.value
    if (value === "/")
      e.target.value = ""
    if (len > 1 && value.startsWith("/")) {
      e.target.value = value.slice(1)
    }
    if (len > 0 && !value.endsWith("/")) {
      const pos = e.target.selectionStart
      e.target.value += "/"
      e.target.setSelectionRange(e.target.selectionStart, pos)
    }
    if (len > 1 && value.includes("//")) {
      e.target.value = value.replace("//", "/")
    }
  }

  return (
    <div className="Administration">
      <Container>
        <Row>
          <h1>이미지 등록</h1>
          <Form encType="multipart/form-data">
            <Form.Group controlId="multipleFileInput" className="mb-3">
              <Form.Label>이미지 저장 경로</Form.Label>
              <Form.Control ref={multiplePathRef} type="text" placeholder="이미지를 저장할 경로" onInput={pathRefFormatter} />
              <Form.Label>이미지 파일 선택</Form.Label>
              <Form.Control
                ref={multipleImgRef}
                type="file"
                name="file"
                accept="image/*"
                multiple
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" onClick={handleImagesSubmit(multipleImgRef, multiplePathRef)}>
              업로드
            </Button>
            <Button variant="secondary" onClick={handleShowImageListModal} className="ms-2">
              업로드된 이미지 보기
            </Button>
          </Form>
        </Row>
        <Row>
          <h1>회원 목록...</h1>
        </Row>
        <Row>
          <h1>게시글 목록...</h1>
        </Row>
        <Row>
          <h1>댓글 목록...</h1>
        </Row>
        <Row>
          <h1>질의응답 목록...</h1>
        </Row>
      </Container>
      <Modal show={showImageListModal} onHide={handleCloseImageListModal} centered>
        <Form encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>이미지 보기...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            이미지 리스트 보기...
          </Modal.Body>
          <Modal.Footer>
            수정/삭제기능...
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
export default Administration