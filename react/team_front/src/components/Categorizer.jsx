import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Bread from "./Bread"
import { useLocation, useNavigate } from "react-router-dom"

function Categorizer( {secondCategory, setSecondCategory} ) {
  const [selectedCat, setSelectedCat] = useState([])
  const location=useLocation()
  // const [secondCategory, setSecondCategory]=useState("")
  const navigate=useNavigate()

  const mockupData={
    "에스프레소":["카푸치노", "마키아토", "코르타도", "카페모카", "카페라떼"],
    "브루잉":["핸드드립", "콜드브루", "프렌치프레스", "케멕스"],
    "블렌디드":["블렌디드커피", "아인슈페너", "니트로커피"],
  }
  const [categories, setCategories]=useState({})
  categories.Espresso=mockupData["에스프레소"]
  categories.Brewing=mockupData["브루잉"]
  categories.Blended=mockupData["블렌디드"]

  // let location={pathname:"/cat/"}
  const firstCategory=decodeURIComponent(String(location.search).slice(6))
  console.log(firstCategory)
  console.log(location.pathname)
  const categoryLocation={
    pathname:'/'+firstCategory+'/'+secondCategory
  }

  const convertCat={
    "Espresso":"에스프레소",
    "Brewing":"브루잉",
    "Blended":"블렌디드",
  }

  return (
    <div className="Categorizer">
      <Bread location={categoryLocation}/>
      <Container className="categorizerBox">
        {
          Object.keys(categories).map((cat, i) => {
              return (
                <Row key={i} className="row" style={{ borderBottom: `1px solid #dfdfdf` }}>
                  <Col className="col-sm-3" onClick={()=>{
                    setSecondCategory("")
                    navigate(`/category?menu=${convertCat[cat]}`)
                    }}>
                    <p>{cat.toString()}</p>
                  </Col>
                  <Col className="col-sm-9">
                    <div style={{ display: `flex`, flexDirection: 'row', flexWrap: 'wrap', gap: `10px 20px` }}>
                      {
                        categories[cat].map((item, j) => {
                          return (
                            <div key={"" + i + j}>
                              <span className="catSpan" key={j} onClick={(e) => {
                                console.log(e.target.innerText)
                                setSecondCategory(e.target.innerText)
                                setSelectedCat([e.target.innerText, ...selectedCat])
                              }}>{item}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </Col>
                </Row>
              )
          })
        }
      </Container>
    </div>
  )
}
export default Categorizer