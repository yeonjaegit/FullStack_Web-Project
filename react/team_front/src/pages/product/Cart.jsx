import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../axios/axiosInstance"
import { jwtDecode } from "jwt-decode"

const Cart = () => {
  const [cart, setCart] = useState([])
  const [decodeJwt, setDecodedJwt] = useState()

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if(jwt)
      setDecodedJwt(jwtDecode(jwt))
  }, [])

  useEffect(() => {
    if(!decodeJwt)
      return
    axiosInstance.get(`/cart?id=${decodeJwt.id}`)
      .then(response => {
        let data = response.data;
        data.map((item) => {
          item['count'] = 1;
        })
        setCart(data)
      }).catch(error => {
        console.log(error)
      })
  }, [decodeJwt])

  const [checkedItems, setCheckedItems] = useState([])

  const handleAllCheck = (checked) => {
    if(checked) {
      const idArray = cart.map(product => product.id)
      setCheckedItems(idArray)
    } else {
      setCheckedItems([])
    }
  }

  const handleSingleCheck = (checked, id) => {
    if(checked) {
      setCheckedItems(prev => [...prev, id])
    } else {
      setCheckedItems(checkedItems.filter((checkedId) => checkedId !== id))
    }
  }

  const deleteCartItem = () => {
    console.log(checkedItems)
    console.log(decodeJwt.id)

    if(!decodeJwt) {
      alert('로그인 필요')
    } else {
      const payload = {
        productId: checkedItems,
        memberId: decodeJwt.id
      }
      axiosInstance.delete(`/cart`, {data: payload})
      .then(response => {
        alert(response.data.msg)
        setCart(response.data.cart)
        // location.reload(true)
      }).catch(error => {
        console.error(error)
        alert('삭제 실패')
      }, [decodeJwt])
    }

  }

  if (cart.length === 0) {
    return (
      <Container style={{ border: `1px solid gray`, padding: `30px` }}>
        <h2 style={{ textAlign: `center` }}>장바구니 목록 없음</h2>
      </Container>
    )
  }

  return (
    <div className="Cart" style={{ padding: `30px` }}>
      <Container style={{ border: `1px solid gray`, borderRadius: `5px`, padding: `20px` }}>
        <Row className="mt-5">
          <Col style={{ textAlign: `center` }}>
            <h2>장바구니 목록</h2>
          </Col>
        </Row>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>
                <input
                 type="checkbox"
                 onChange={(e) => handleAllCheck(e.target.checked)}
                 checked={checkedItems.length === cart.length && cart.length > 0} />전체선택</th>
              <th>번호</th>
              <th>상품명</th>
              <th>수량</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((product, i) => (
                <tr key={product.id}>
                  <td><input
                   type="checkbox"
                   onChange={(e) => handleSingleCheck(e.target.checked, product.id)}
                   checked={checkedItems.includes(product.id)}/></td>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>
                    <Button onClick={() => {product.count>0 && product.count--}}>-</Button>
                    {product.count}
                    <Button onClick={() => {product.count++}}>+</Button></td>
                  <td>{product.price}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Row className="mt-4 p-3" style={{borderTop: `1px solid #ccc`}}>
          <Col md={3} style={{textAlign: `center`, fontWeight: `bold`}}>
            전체 가격 : 0000
          </Col>
          <Col md={6} style={{textAlign: `right`}}>
            <Button
             variant="danger"
             className="me-2"
             onClick={deleteCartItem}>선택 삭제</Button>
          </Col>
          <Col md={3}>
            <Button
             variant="primary"
             onClick={() => {}}>주문하기</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart