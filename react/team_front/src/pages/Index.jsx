import { useEffect, useState } from "react";
import VerticalCarouselV2 from "../components/VerticalCarouselV2";
import Footer from "../components/Footer";
import { Container, Row } from "react-bootstrap";
import './index.css'

/**
 * draws index page
 * @param
 * @returns 
 */
function Index() {
  function buttonHandler(e){
    e.preventDefault()
    // alert('등록 완료')
  }

  const pageStyles = [
    {
      width: "100vw",
      height: "100vh",
      // backgroundColor: "grey",
      backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/images/etc/1.png)`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    },
    {
      width: "100vw",
      height: "100vh",
      // backgroundColor: "red",
      backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/images/etc/3.png)`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    },
    {
      width: "100vw",
      height: "100vh",
      // backgroundColor: "green",
      backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/images/etc/2.png)`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    },
    {
      width: "100vw",
      height: "100vh",
      // backgroundColor: "blue",
      backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/images/etc/4.png)`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    },
    {
      width: "100vw",
      height: "100vh",
      // backgroundColor: "orange",
      backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/images/etc/5.png)`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    },
    {} //footer
  ]

  const arrayComponent = [
    {
      component:
        <div className="bg-blur" style={pageStyles[0]}>
          <section className="ad-section text-center" style={{ height: "100%", paddingTop: "30px" }}>
            <Container style={{ height: "100vh", backgorundColor:"rgba(255, 255, 255, 1)", color: "white", textShadow:"1px 1px 5px black"}}>
              <Row style={{ maxHeight: "20vh" }}>
                <h1 className="display-4 mt-5 mb-4">✨ 레트로 감성 카페모카 출시 ✨</h1>
                <h2 style={{ zIndex: 10 }} className="mb-3">Cafe Mocha</h2>
              </Row>
              <Row style={{ minHeight: "50vh", justifyContent: "center" }}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/ad/retro/cafe_mocha_retro.png`}
                  alt="카페 모카 광고"
                  className="img-fluid rounded shadow mb-4"
                  style={{ maxHeight: "45vh", maxWidth: "45vh", objectFit: "scale-down" }}
                />
                <p className="lead mb-4">
                  진한 에스프레소, 부드러운 초콜릿,
                  크리미한 휘핑이 어우러진 완벽한 조화를 느껴보세요.
                  언제나 따뜻하게 함께하는 포근한 즐거움.
                </p>
                <button onClick={buttonHandler} className="btn btn-dark btn-lg">
                  지금 주문하기
                </button>
              </Row>
            </Container>
          </section>
        </div>,
      height: "100vh"
    },
    {
      component:
        <div className="bg-blur"  style={pageStyles[1]}>
          <section className="ad-section text-center" style={{ height: "100%", paddingTop: "30px" }}>
            <Container  className="bg-light" style={{ height: "100vh" }}>
              <Row style={{ maxHeight: "20vh" }}>
                <h1 className="display-4 mt-5 mb-4">☕ 따뜻한 휴식, 카푸치노 ☕</h1>
                <h2 style={{ zIndex: 10 }} className="mb-3">풍부하고, 부드럽고, 잊을 수 없는 순간</h2>
              </Row>
              <Row style={{ minHeight: "50vh", justifyContent: "center" }}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/ad/retro/cappuccino_retro.png`}
                  alt="카푸치노 광고"
                  className="img-fluid rounded shadow mb-4"
                  style={{ maxHeight: "45vh", maxWidth: "45vh", objectFit: "scale-down" }}
                />
                <p className="lead mb-4">
                  깊고 진한 풍미, 부드러운 크리미함, 그리고 마음을 녹이는 여운.
                  한 잔의 카푸치노가 선사하는 레트로 감성의 특별한 휴식.
                </p>
                <button onClick={buttonHandler} className="btn btn-dark btn-lg">
                  지금 주문하기
                </button>
              </Row>
            </Container>
          </section>
        </div>,
      height: "100vh"
    },
    {
      component:
        <div className="bg-blur"  style={pageStyles[2]}>
          <section className="ad-section text-center" style={{ height: "100%", paddingTop: "30px" }}>
            <Container  className="bg-light" style={{ height: "100vh" }}>
              <Row style={{ maxHeight: "20vh" }}>
                <h1 className="display-4 mt-5 mb-4">✨ 달콤한 즐거움, 카라멜 마키아또 ✨</h1>
                <h2 style={{ zIndex: 10 }} className="mb-3">부드러움과 달콤함의 완벽한 조화</h2>
              </Row>
              <Row style={{ minHeight: "50vh", justifyContent: "center" }}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/ad/retro/caramel_machiato_retoro.png`}
                  alt="카라멜 마키아또 광고"
                  className="img-fluid rounded shadow mb-4"
                  style={{ maxHeight: "45vh", maxWidth: "45vh", objectFit: "scale-down" }}
                />
                <p className="lead mb-4">
                  달콤한 카라멜 소스와 부드러운 우유, 진한 에스프레소의 완벽한 층을 느껴보세요.
                  한 모금에 퍼지는 행복한 달콤함이 당신의 하루를 특별하게 만들어 줍니다.
                </p>
                <button onClick={buttonHandler} className="btn btn-dark btn-lg">
                  지금 주문하기
                </button>
              </Row>
            </Container>
          </section>
        </div>,
      height: "100vh"
    },
    {
      component:
        <div className="bg-blur" style={pageStyles[3]}>
          <section className="ad-section text-center" style={{ height: "100%", paddingTop: "30px" }}>
            <Container  className="bg-light" style={{ height: "100vh" }}>
              <Row style={{ maxHeight: "20vh" }}>
                <h1 className="display-4 mt-5 mb-4">🧊 부드럽고 깔끔한, 콜드브루 ☕</h1>
                <h2 style={{ zIndex: 10 }} className="mb-3">시간이 빚어낸 깊고 섬세한 풍미</h2>
              </Row>
              <Row style={{ minHeight: "50vh", justifyContent: "center" }}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/ad/retro/coldbrew_retro.png`}
                  alt="콜드브루 광고"
                  className="img-fluid rounded shadow mb-4"
                  style={{ maxHeight: "45vh", maxWidth: "45vh", objectFit: "scale-down" }}
                />
                <p className="lead mb-4">
                  오랜 시간 저온 추출로 완성된 깔끔하고 부드러운 맛.
                  쌉싸름함 없이 은은하게 퍼지는 커피 본연의 풍미를 즐겨보세요.
                  시원하고 완벽한 한 잔의 여유.
                </p>
                <button onClick={buttonHandler} className="btn btn-dark btn-lg">
                  지금 주문하기
                </button>
              </Row>
            </Container>
          </section>
        </div>,
      height: "100vh"
    },
    {
      component:
        <div className="bg-blur" style={pageStyles[4]}>
          <section className="ad-section text-center" style={{ height: "100%", paddingTop: "30px" }}>
            <Container  className="bg-light" style={{ height: "100vh" }}>
              <Row style={{ maxHeight: "20vh" }}>
                <h1 className="display-4 mt-5 mb-4">🍰 부드러운 달콤함, 크림뷜레 🍮</h1>
                <h2 style={{ zIndex: 10 }} className="mb-3">바삭한 설탕과 부드러운 크림의 조화</h2>
              </Row>
              <Row style={{ minHeight: "50vh", justifyContent: "center" }}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/ad/retro/creambrulile_retro.png`}
                  alt="크림뷜레 광고"
                  className="img-fluid rounded shadow mb-4"
                  style={{ maxHeight: "45vh", maxWidth: "45vh", objectFit: "scale-down" }}
                />
                <p className="lead mb-4">
                  달콤하고 부드러운 커스터드 위에 바삭하게 구운 설탕 코팅이 일품입니다.
                  한 스푼 떠먹을 때마다 느껴지는 완벽한 식감의 조화.
                  크림뷜레가 선사하는 특별한 디저트 경험을 만나보세요.
                </p>
                <button onClick={buttonHandler} className="btn btn-dark btn-lg">
                  지금 주문하기
                </button>
              </Row>
            </Container>
          </section>
        </div>,
      height: "100vh"
    },
    {
      component:
        <div style={pageStyles[5]}>
          <Footer />
        </div>,
      height: 250
    },
  ]

  return (
    <div className="Index">
      <VerticalCarouselV2 arrayComponent={arrayComponent} />
    </div>
  )
}

export default Index;