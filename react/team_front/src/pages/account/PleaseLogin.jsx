import { Container } from "react-bootstrap"

function PleaseLogin(){

  return (
    <div className="PleaseLogin">
      <Container>
        <h1>잘못된 접근</h1>
        <p>로그인하지 않은 사용자입니다. 로그인해주세요.</p>
      </Container>
    </div>
  )
}
export default PleaseLogin