import { Col, Container, Row } from 'react-bootstrap'
import { Map, MapMarker } from 'react-kakao-maps-sdk'


function Location({ address = '서울특별시 강동구 천호대로' }) {

  return (
    <div className="location">
      <Container>
        <div className='location-title'>
          <h2>Contact Us</h2>
        </div>
        <Container className="location-content">
          <Row>
            <Col>
              <Map
                center={{ lat: 37.53839, lng: 127.12357 }}
                style={{ width: "600px", height: "400px" }}>
                <MapMarker position={{ lat: 37.53825, lng: 127.12730 }} >
                  <div className='marker'>해당위치</div>
                </MapMarker>
              </Map>
            </Col>
          </Row>

          <Container className="location-footer">
            <Row>
              <Col>
                <div className='location-footer-title'>
                  <h2>찾아오시는 길</h2>
                </div>
                <div className="location-footer-main">
                  <p>서울특별시 강동구 천호대로 157길 14</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </div>
  )
}

export default Location;