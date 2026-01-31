import { useRef, useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap"
import axiosInstance from "../axios/axiosInstance";

/**
 * deprecated
 * 
 */
function Upload() {
  const [showSingle, setShowSingle] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);
  const imgRef=useRef()
  const imgPathRef=useRef()
  const multipleImgRef=useRef()
  const multiplePathRef=useRef()

  const handleCloseSingle = () => setShowSingle(false);
  const handleShowSingle = () => setShowSingle(true);

  const handleCloseMultiple = () => setShowMultiple(false);
  const handleShowMultiple = () => setShowMultiple(true);

  /**
   * handles image(s) to submit
   * @param {*} ref 
   * @param {*} pathRef 
   * @returns 
   */
  const handleImagesSubmit = (ref, pathRef) => {
    return (e)=>{
      e.preventDefault();
      const files=[...ref.current.files]
      console.log(files)
      const fd=new FormData()
      files.forEach(file=>{fd.append('files', file)})
      axiosInstance.post('/images', fd, {
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        params : {
          "path": pathRef.current.value
        }
      })
      .then(response =>{
        alert(response.data)
        console.log(response)
      })
      .catch(error =>{
        alert("업로드 실패")
        console.error(error)
      })
    }
  }
  function pathRefFormatter(e){
    const len=e.target.value.length
    const value=e.target.value
    if (value==="/")
      e.target.value=""
    if (len>1 && value.startsWith("/")) {
      e.target.value=value.slice(1)
    }
    if (len>0 && !value.endsWith("/")) {
      const pos=e.target.selectionStart
      e.target.value+="/"
      e.target.setSelectionRange(e.target.selectionStart, pos)
    }
    if (len>1 && value.includes("//")) {
      e.target.value=value.replace("//", "/")
    }
  }

  return (
    <div className="Upload">
      <Container className="_image-cards">
      </Container>
      <Container>
        {/* Trigger buttons */}
        <Button variant="primary" onClick={handleShowSingle}>
          단일 이미지 업로드
        </Button>
        <Button variant="secondary" onClick={handleShowMultiple} className="ms-2">
          다중 이미지 업로드
        </Button>

        {/* Single Upload Modal */}
        <Modal show={showSingle} onHide={handleCloseSingle} centered>
          <Form encType="multipart/form-data">
            <Modal.Header closeButton>
              <Modal.Title>이미지 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="fileInput" className="mb-3">
                <Form.Label>이미지 저장 경로</Form.Label>
                <Form.Control ref={imgPathRef} type="text" placeholder="이미지를 저장할 경로" onInput={pathRefFormatter}/>
                <Form.Label>이미지 파일 선택</Form.Label>
                <Form.Control ref={imgRef} type="file" name="file" accept="image/*" required />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleImagesSubmit(imgRef, imgPathRef)}>
                업로드
              </Button>
              <Button variant="secondary" onClick={handleCloseSingle}>
                취소
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Multiple Upload Modal */}
        <Modal show={showMultiple} onHide={handleCloseMultiple} centered>
          <Form encType="multipart/form-data">
            <Modal.Header closeButton>
              <Modal.Title>이미지 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="multipleFileInput" className="mb-3">
                <Form.Label>이미지 저장 경로</Form.Label>
                <Form.Control ref={multiplePathRef} type="text" placeholder="이미지를 저장할 경로" onInput={pathRefFormatter}/>
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
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleImagesSubmit(multipleImgRef, multiplePathRef)}>
                업로드
              </Button>
              <Button variant="secondary" onClick={handleCloseMultiple}>
                취소
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  )
}
export default Upload