import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../axios/axiosInstance"

const Favorite = () => {
  const [favorite, setFavorite] = useState([])
  const [decodeJwt, setDecodeJwt] = useState()

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if (jwt)
      setDecodeJwt(jwtDecode(jwt))
  }, [])

  useEffect(() => {
    if (!decodeJwt)
      return
    axiosInstance.get(`/favorite?id=${decodeJwt.id}`)
      .then(response => {
        setFavorite(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [decodeJwt])

  const [checkedItems, setCheckedItems] = useState([])

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = favorite.map(product => product.id)
      setCheckedItems(idArray)
    } else {
      setCheckedItems([])
    }
  }

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems(prev => [...prev, id])
    } else {
      setCheckedItems(checkedItems.filter((checkedId) => checkedId !== id))
    }
  }

  const deleteFavoriteItem = () => {
    console.log(checkedItems)
    console.log(decodeJwt.id)
    if (!decodeJwt) {
      alert('로그인 필요')
    } else {
      const payload = {
        productId: checkedItems,
        memberId: decodeJwt.id
      }
      axiosInstance.delete(`/favorite`, { data: payload })
        .then(response => {
          console.log("??????")
          alert(response.data.msg)
          setFavorite(response.data.favorite)
        }).catch(error => {
          console.error(error)
          alert('삭제 실패')
        }, [decodeJwt])
    }
  }


  if (favorite.length === 0) {
    return (
      <Container style={{ border: `1px solid gray`, padding: `30px` }}>
        <h2 style={{ textAlign: `center` }}>찜 목록 없음</h2>
      </Container>
    )
  }

  return (
    <div className="Favorite" style={{ padding: `30px` }}>
      <Container style={{ border: `1px solid gray`, borderRadius: `5px`, padding: `20px` }}>
        <Row className="mt-5">
          <Col style={{ textAlign: `center` }}>
            <h2>찜 목록</h2>
          </Col>
        </Row>
        <Table className="mt-4">
          <thead>
            <tr>
              <th><input
                type="checkbox"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkedItems.length === favorite.length && favorite.length > 0} />전체선택</th>
              <th>번호</th>
              <th>상품명</th>
              <th>가격</th>
              <th>삭제하기</th>
              <th>장바구니</th>
            </tr>
          </thead>
          <tbody>
            {
              favorite.map((product, i) => (
                <tr key={product.id}>
                  <td><input
                    type="checkbox"
                    onChange={(e) => handleSingleCheck(e.target.checked, product.id)}
                    checked={checkedItems.includes(product.id)} /></td>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={deleteFavoriteItem}>삭제</Button>
                  </td>
                  <td>
                    <Button onClick={() => { }}>담기</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Row className="mt-4 p-3" style={{ borderTop: `1px solid #ccc` }}>
          <Col md={9} style={{ textAlign: `right` }}>
            <Button
              variant="danger"
              className="me-2"
              onClick={deleteFavoriteItem}>전체 삭제</Button>
          </Col>
          <Col md={3}>
            <Button
              variant="primary"
              onClick={() => { }}>전체 담기</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Favorite