import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { useLocation } from 'react-router-dom'

const Advertisement = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    const advertisement = queryParams.get("advertisement")
    alert('광고페이지 이동')
    if(!advertisement) {
      alert('광고 없음')
    }
  }, [])

  return(
    <div>
      <Container> 
      <Card>
        <Card.Img
         variant="top"
         src="https://placehold.co/800x400/555/fff?text=FRESH+START"/>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      </Container>
    </div>
  )
}

export default Advertisement