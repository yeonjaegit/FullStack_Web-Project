import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"
import axiosProduct from "../../axios/axiosProduct"
import Bread from "../../components/Bread"
import {useDispatch, useSelector} from "react-redux"
import axiosInstance from "../../axios/axiosInstance"
import { updateJwt } from "../../redux/store"

const Detail = () => {
  const { id } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [data, setData] = useState({ id: undefined, category: "", imageUrl: "", content: "", price: 0, productName: "" })
  const dispatch=useDispatch()
  const jwt=useSelector(state=>state.jwt)
  let categoryLocation = { pathname: "" }
  
  // 이미지 URL 처리 함수
  const getImageUrl = () => {
    if (!data.imageUrl) return '';
    
    let url = data.imageUrl;
    // /images/로 시작하지 않으면 추가
    if (!url.startsWith('/images/')) {
      url = `/images/${url}`;
    }
    // 공백을 URL 인코딩
    return url.replaceAll(" ", "%20");
  };

  useEffect(() => {
    axiosProduct.getProduct(id, (response) => { setData(response.data) })
  }, [])

  function favoriteHandler(e) {
    e.preventDefault()
    dispatch(updateJwt())
    
    if (!jwt.id) {
      alert("로그인이 필요합니다")
      return
    }
    
    const payload = {
      productId: data.id,
      memberId: jwt.id
    }
    console.log(payload)
    axiosInstance.post(`/favorite`, payload)
      .then(response => {
        alert('찜목록 등록완료')
      }).catch(error => {
        console.error(error)
        alert('찜목록 등록 실패')
      })
  }

  function cartHandler(e) {
    e.preventDefault()
    dispatch(updateJwt())

    if (!jwt.id) {
      alert("로그인이 필요합니다")
      return
    }
    
    const payload = {
      productId: data.id,
      memberId: jwt.id
    }
    console.log(payload)
    axiosInstance.post(`/cart`, payload)
      .then(response => {
        alert('장바구니 등록완료')
      }).catch(error => {
        console.error(error)
        alert('장바구니 등록 실패')
      })
  }

  if (data.id) {
    categoryLocation = {
      pathname: '/' + data.category
    }
  }

  if (!data.id) {
    return (
      <h1>로딩중...</h1>
    )
  }

  useEffect(()=>{
    dispatch(updateJwt())
  }, [])

  return (
    <div className="Detail">
      {/*{ data.id &&
      <Bread categoryLocation={categoryLocation}/>
      } */}
      <Container>
        <Row className="mt-3 mb-3">
          <Col xs={8}>
            <img src={import.meta.env.VITE_SERVER_URL + getImageUrl()} alt="상품 이미지" style={{width:"100%"}}/>
          </Col>
          <Col xs={4} style={{ marginTop: '50px' }}>
            <h1>{data.productName}</h1>
            <p>{data.content}</p>
            <p>가격: {data.price}</p>
            <Button onClick={favoriteHandler} variant="none"><i className="fa-solid fa-heart"></i></Button>
            <Button onClick={cartHandler} variant="none"><i className="fa-solid fa-basket-shopping"></i></Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Detail