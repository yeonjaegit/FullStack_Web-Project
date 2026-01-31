import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const History = () => {
  const historyData = [
    {
      src:`${import.meta.env.VITE_SERVER_URL}/images/etc/2.png`,
      year: "2015년",
      title: "Roomcorner Cafe 창립",
      text: "'최고의 한 잔으로 일상을 풍요롭게'라는 비전 아래, 룸코너 카페가 탄생했습니다. 첫 번째 블렌드인 '모닝 블리스(Morning Bliss)'를 선보이며, 커피 애호가들의 입맛을 사로잡았습니다."
    },
    {
      src:`${import.meta.env.VITE_SERVER_URL}/images/etc/4.png`,
      year: "2018년",
      title: "시장 확장과 로스팅 기술 선도",
      text: "블렌드 커피 3종 출시 와 '콜드브루 RTD' 시장 진출로 폭발적인 성장을 이뤘습니다. 특히, 자체 개발한 '스마트 로스팅 시스템'으로 커피의 맛과 향을 한 단계 끌어올렸습니다."
    },
    {
      src:`${import.meta.env.VITE_SERVER_URL}/images/bg/3.png`,
      year: "2022년",
      title: "세계로 퍼지는 향기",
      text: "동남아시아 시장에 성공적으로 진출하며 글로벌 시장에 첫발을 내디뎠습니다. '베트남 하노이 1호점 오픈'과 '글로벌 원두 직거래 파트너십 체결'을 통해 커피의 가치를 전 세계에 알리기 시작했습니다."
    },
    {
      src:`${import.meta.env.VITE_SERVER_URL}/images/bg/5.png`,
      year: "2025년",
      title: "지속 가능한 미래를 위한 한 잔",
      text: "'지속 가능한 커피'를 위해 '공정 무역 원두 사용 확대'와 '업사이클링 컵 캠페인'을 추진하고 있습니다. 앞으로도 끊임없는 도전과 혁신을 통해 사람과 환경 모두를 생각하는 커피 문화를 만들어 나갈 것입니다."
    },

  ]
  return (
    <div className='History'>
      <Container>
        <Card>
          <Card.Img variant="top" src={`${import.meta.env.VITE_SERVER_URL}/images/etc/3.png`} />
          <Card.Body>
            <Card.Text style={{textAlign: `center`}}>
              우리는 최고의 커피 한 잔으로 당신의 일상을 풍요롭게 하는 것을 목표로 합니다.<br/>
              2015년부터 시작된 방구석 카페의 여정은 '스마트 로스팅' 기술을 통해 특별한 향과 맛을<br/> 전해왔습니다.
              이제는 지속 가능한 미래를 위해 공정 무역과 친환경 캠페인에 앞장서며,<br/> 전 세계에 우리의 따뜻한 가치를 전하고 있습니다
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Row xs={1} md={2} className="g-4">
          {historyData.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={item.src} />
                <Card.Body>
                  <Card.Title>{item.year} : <br /> {item.title}</Card.Title>
                  <Card.Text>
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default History;