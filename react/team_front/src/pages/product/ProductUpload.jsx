import { jwtDecode } from 'jwt-decode'
import { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import axiosInstance from '../../axios/axiosInstance'

const ProductUpload = () => {
  const [show, setShow] = useState(false)
  const productNameRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const contentRef = useRef()
  const fileInputRef = useRef()

  async function submitHandler(e){
    e.preventDefault()
    const jwt = sessionStorage.getItem('jwt')
    if (!jwt) {
      console.error('jwt must not be null')
      return
    }

    try {
      let imageUrl = ''
      
      // 1. 이미지 파일이 선택되었으면 먼저 업로드
      const fileInput = fileInputRef.current
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData()
        formData.append('files', fileInput.files[0])
        
        const uploadResponse = await axiosInstance.post('/images?path=coffee/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        console.log('Image upload response:', uploadResponse.data)
        
        // 응답에서 URL 추출 (응답 형식에 따라 조정 필요)
        const responseText = uploadResponse.data
        const urlMatch = responseText.match(/url:([^\n]+)/)
        if (urlMatch) {
          imageUrl = urlMatch[1].trim()
        }
      }

      // 2. 상품 정보 저장
      const product = {
        productName: productNameRef.current.value,
        category: categoryRef.current.value,
        price: priceRef.current.value,
        content: contentRef.current.value,
        imageUrl: imageUrl,
        member: { id: jwtDecode(jwt).id },
      }
      
      console.log('Product to save:', product)
      
      await axiosInstance.post('/product', product)
      alert('상품 등록 완료')
      handleClose()
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('상품 등록 실패: ' + (error.response?.data || error.message))
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Container>
        <Button variant="primary" onClick={handleShow}>
          상품 등록하기
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>새 상품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>상품 이름</Form.Label>
              <Form.Control
                type="stockName"
                placeholder="Stock Name"
                autoFocus ref={productNameRef}/>
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category (쉼표(,)로 구분해서 입력하세요.)</Form.Label>
              <Form.Control
                type="stockCategory"
                placeholder=""
                autoFocus ref={categoryRef}/>
            </Form.Group>
            <Form.Group controlId="fileInput" className="mb-3">
              <Form.Label>이미지 첨부</Form.Label>
              <Form.Control
                type="file"
                name="file"
                accept="image/*"
                placeholder="Choice Image"
                autoFocus
                ref={fileInputRef}
                required />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="stockPrice"
                placeholder="$ Enter in units"
                autoFocus ref={priceRef}/>
            </Form.Group>
            <Form.Group controlId="explain" className="mb-3">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control
                type="stockExplain"
                placeholder="Please Input Explain "
                autoFocus
                rows={3} ref={contentRef}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={submitHandler}>
            저장
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductUpload;