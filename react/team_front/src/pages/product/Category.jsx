import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Categorizer from '../../components/Categorizer'
import ProductCard from '../../components/ProductCard'
import axiosInstance from '../../axios/axiosInstance'


const Category = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [currentMenu, setCurrentMenu] = useState([])
  const [secondCategory, setSecondCategory]=useState("")

  useEffect(() => {
    const menu = queryParams.get("menu")
    console.log("Searching for category:", menu)
    
    if (!menu) return
    
    axiosInstance.get(`/product?category=${menu}`)
      .then(response => {
        console.log("Products found:", response.data)
        setCurrentMenu(response.data)
      })
      .catch(error => {
        console.log("Error fetching products:", error)
      })
  }, [location.search])

  useEffect(()=>{
    if (!secondCategory) return
    
    console.log("Searching for secondCategory:", secondCategory)
    axiosInstance.get(`/product?category=${secondCategory}`)
      .then(response => {
        console.log("Products found for secondCategory:", response.data)
        setCurrentMenu(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    
  }, [secondCategory])

  return (
    <div className="Category">
      <Container>
        <Categorizer secondCategory={secondCategory} setSecondCategory={setSecondCategory}/>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: '20px' }}>
          {
            currentMenu.length > 0 ? (
              currentMenu.map((item) => (
                <Col key={item.id}>
                  <ProductCard data={item} cardWidth={400}/>
                </Col>
              ))
            ) : (
              <Col>
                <p>해당 메뉴의 상품이 없습니다.</p>
              </Col>
            )
          }
        </Row>
      </Container>
    </div>
  )
}

export default Category