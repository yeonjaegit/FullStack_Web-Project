import { Button, Card, InputGroup } from 'react-bootstrap'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateJwt } from '../redux/store'
import axiosInstance from '../axios/axiosInstance'

const ProductCard = ({ data, cardWidth}) => {
  const navigate=useNavigate()
  const [width, setWidth]=useState(`18rem`)
  const jwt=useSelector(state=>state.jwt)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(updateJwt())
  }, [])
  
  // 이미지 URL 처리: /images/로 시작하지 않으면 추가
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

  const imageUrl = getImageUrl();
  console.log('Image URL:', imageUrl);

  useEffect(() => {
    if (!(cardWidth === undefined)) {
      setWidth(cardWidth)
    }
    updateJwt()
  }, [])

  function favoriteHandler(e) {
    e.preventDefault()
    dispatch(updateJwt())
    
    if(!jwt.id){
      alert("로그인이 필요합니다")
      navigate('/login')
      return
    }
    
    const payload={
      productId:data.id,
      memberId:jwt.id
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

    if(!jwt.id) {
      alert("로그인이 필요합니다")
      navigate('/login')
      return
    }
    
    const payload = {
      productId: data.id,
      memberId: jwt.id
    }
    axiosInstance.post(`/cart`, payload)
      .then(response => {
        alert('장바구니 등록완료')
      }).catch(error => {
        console.error(error)
        alert('장바구니 등록 실패')
      })
  }

  return (
    <div className="ProductCard">
      <Card
        style={{
          width: width,
          border: `none`,
        }}>
        <div
          className="_cardImgWrapper"
          onClick={() => navigate(`/detail/${data.id}`)}
          style={{
            backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}${imageUrl})`,
            backgroundPosition: "center",
          }}></div>
        <Card.Body>
          <Card.Title className='_cardTitle'>{data.productName}</Card.Title>
          <h3 className='_cardPrice'>
            {data.price}
          </h3>
          <p className='_cardText'>
            {data.content}
          </p>
          <InputGroup>
            <Button onClick={() => {
              navigate(`/detail/${data.id}`)
            }} variant="secondary">상세보기</Button>
            <Button onClick={favoriteHandler} variant="none"><i className="fa-solid fa-heart"></i></Button>
            <Button onClick={cartHandler} variant="none"><i className="fa-solid fa-basket-shopping"></i></Button>
          </InputGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
export default ProductCard