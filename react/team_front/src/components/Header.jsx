import { Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axiosMember from "../axios/axiosMember"

function Header({ location }) {
  const windowSize = useSelector(state => state.windowSize)
  const auth = useSelector(state => state.auth)
  const jwt = useSelector(state => state.jwt)
  const isExt = windowSize.width > 1300
  const isMid = windowSize.width > 768 && windowSize.width <= 1300
  const menuWidth = isExt ? 1300 : "100%"
  const [showHeader, setShowHeader] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(`rgba(255, 255, 255, 0)`)
  const transition = "background-color 0.3s ease-in-out"
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rowMenuStyle = isExt ?
    {
      width: "100%"
    }
    :
    {
      width: "100%",
      padding: 0,
      justifyContent: "space-around",
      display: "flex",
      flexWrap: "wrap",
    }
  const colBrandStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgroundColor,
    transition: transition,
  }
  const colMenuStyle = {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: backgroundColor,
    transition: transition,
  }
  const listItemStyle = {
    border: "none",
    fontWeight: "bold",
    backgroundColor: backgroundColor,
    transition: transition,
  }
  const colIconsStyle = {
    textAlign: "center",
    backgroundColor: backgroundColor,
    transition: transition,
  }
  const rowItemsStyle = {
    width: "100%",
    maxHeight: showHeader ? "500px" : "0px",
    opacity: showHeader ? 1 : 0,
    transform: showHeader ? "translateY(0)" : "translateY(-20px)",
    overflow: "hidden",
    transition: "max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
    backgroundColor: backgroundColor,
  }
  const rowListItemStyle = {
    border: "none",
    textAlign: "center",
    backgroundColor: backgroundColor,
    // transition:transition,
  }
  const menuListGroupStyle = {
    border: "none",
    width: "100%",
    justifyContent: "center",
    padding: 0,
    backgroundColor: backgroundColor,
    transition: transition,
  }
  const outerMostBoxStyle = isExt ? {
    position: location.pathname === "/" ? "fixed" : "sticky",
    zIndex: 100,
    top: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    display: "flex",
    backgroundColor: backgroundColor,
    transition: transition,
  } : isMid ? {
    position: location.pathname === "/" ? "fixed" : "sticky",
    zIndex: 100,
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: backgroundColor,
    transition: transition,
  } : {}
  const containerStyle = {
    width: isExt ? menuWidth : "100%",
    padding: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: backgroundColor,
    transition: transition,
  }

  function logOutHandler(e) {
    e.preventDefault()
    axiosMember.logout(dispatch)
  }

  function mouseEnterHandler(e) {
    setBackgroundColor(`rgba(255, 255, 255, 1)`)
  }

  function mouseLeaveHandler(e) {
    setBackgroundColor(`rgba(255, 255, 255, 0)`)
    setShowHeader(false)
  }

  const components = {
    logo:
      (isExt || isMid) ?
        <img
          onClick={() => { navigate("/") }}
          src={`${import.meta.env.BASE_URL}img/logo.png`}
          alt='Logo'
          width={'80px'}
          height={'80px'}
          style={{ cursor: "pointer" }} />
        :
        <div className="col-logo" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "80px" }}>
          <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/logo.png`} alt='Logo' width={'80px'} height={'80px'} style={{ cursor: "pointer" }}></img>
        </div>,
    brand:
      <div onClick={() => { navigate("/") }}
        style={{ cursor: "pointer", fontWeight: 700 }}>
        RoomCorner Cafe
      </div>,
    topMenu:
      <Col xs={isExt ? 8 : 10} className="col-menu" style={colMenuStyle}>
        <ListGroup horizontal style={menuListGroupStyle}
          onMouseEnter={() => setShowHeader(true)}>
          <ListGroup.Item action style={listItemStyle}>
            회사 소개
          </ListGroup.Item>
          <ListGroup.Item action style={listItemStyle}>
            커피 메뉴
          </ListGroup.Item>
          <ListGroup.Item action style={listItemStyle}>
            커뮤니티
          </ListGroup.Item>
          {auth ?
            <ListGroup.Item action style={listItemStyle}>
              마이페이지
            </ListGroup.Item>
            :
            <ListGroup.Item onClick={() => { navigate("/login") }} action style={listItemStyle}>
              로그인
            </ListGroup.Item>
          }
        </ListGroup>
      </Col>,
    icons:
      <Col xs={2} className="col-icons" style={colIconsStyle}>
        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/sns_blog.png`} />
        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/facebook.png`} />
        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/instagram.png`} />
        <i style={{cursor:"pointer"}} onClick={() => { navigate("/favorite") }} className="fa-solid fa-heart"></i>
        <i style={{cursor:"pointer"}} onClick={() => { navigate("/cart") }} className="fa-solid fa-cart-shopping"></i>
      </Col>
  }



  return (
    <div className="Header" style={{ transition: "all 0.5s" }}>
      {
        (isExt || isMid) ?
          <div className="HeaderDiv" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} style={outerMostBoxStyle}>
            <Container fluid style={containerStyle}>
              <Row className="rowMenu" style={rowMenuStyle}>
                <Col xs={2} className="col-logo" style={colBrandStyle}>
                  {components.logo}
                  {isExt && components.brand}
                </Col>
                {components.topMenu}
                {isExt && components.icons}
              </Row>
              <Row className="rowItems" style={rowItemsStyle}>
                <Col xs={2}></Col>
                <Col className={isExt ? "col-xs-2" : ""}>
                  <ListGroup style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                    <ListGroup.Item onClick={() => navigate("/history")} action style={rowListItemStyle}>
                      회사 연혁
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/locate")} action style={rowListItemStyle}>
                      매장 위치
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col className={isExt ? "col-xs-2" : ""}>
                  <ListGroup>
                    <ListGroup.Item onClick={() => navigate("/category?menu=에스프레소")} action style={rowListItemStyle}>
                      에스프레소
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/category?menu=브루잉")} action style={rowListItemStyle}>
                      브루잉
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/category?menu=블렌디드")} action style={rowListItemStyle}>
                      블렌디드
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col className={isExt ? "col-xs-2" : ""}>
                  <ListGroup>
                    <ListGroup.Item onClick={() => navigate("/notice")} action style={rowListItemStyle}>
                      공지사항
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/board")} action style={rowListItemStyle}>
                      게시판
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/inquiry")} action style={rowListItemStyle}>
                      1:1 문의
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                {/* 로그인 / 회원가입 / 로그아웃 / 관리자 */}
                <Col className={isExt ? "col-xs-2" : ""}>
                  <ListGroup>
                    {auth ? (
                      <>
                        <ListGroup.Item onClick={() => navigate("/mypage")} action style={rowListItemStyle}>
                          내 정보
                        </ListGroup.Item>
                        <ListGroup.Item onClick={logOutHandler} action style={rowListItemStyle}>
                          로그아웃
                        </ListGroup.Item>
                        <ListGroup.Item onClick={()=>{navigate("/cart")}} action style={rowListItemStyle}>
                          장바구니
                        </ListGroup.Item>
                        <ListGroup.Item onClick={()=>{navigate("/favorite")}} action style={rowListItemStyle}>
                          찜 목록
                        </ListGroup.Item>
                        {jwt.roles && jwt.roles[0] === "ROLE_ADMIN" && (
                          <ListGroup.Item onClick={() => navigate("/admin")} action style={rowListItemStyle}>
                            관리자
                          </ListGroup.Item>
                        )}
                      </>
                    ) : (
                      <>
                        <ListGroup.Item onClick={() => navigate("/signup")} action style={rowListItemStyle}>
                          회원가입
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Col>
                {isExt && <Col xs={2}></Col>}
              </Row>
            </Container>
          </div>
          :
          <div className="HeaderDiv" style={outerMostBoxStyle}>
            <Navbar collapseOnSelect expand="xxl">
              <Container fluid>
                {components.logo}
                <Navbar.Brand onClick={() => { navigate("/") }} style={{ cursor: "pointer", fontWeight: 700 }}>RoomCorner{<br />}Cafe</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto" style={{ width: "100%", justifyContent: "space-around" }}>
                    <NavDropdown
                      title="회사 소개"
                      id="collapsible-nav-dropdown-introduce"
                    >
                      <NavDropdown.Item onClick={() => { navigate("/history") }}>회사 연혁</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate("/locate") }}>매장 위치</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="커피 메뉴"
                      id="collapsible-nav-dropdown-menu"
                    >
                      <NavDropdown.Item onClick={() => { navigate("/category?menu=에스프레소") }}>에스프레소</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate("/category?menu=브루잉") }}>브루잉</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate("/category?menu=블렌디드") }}>블렌디드</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="커뮤니티"
                      id="collapsible-nav-dropdown-Notice"
                    >
                      <NavDropdown.Item onClick={() => { navigate("/notice") }}>공지사항</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate("/board") }}>게시판</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => { navigate("/inquiry") }}>1:1 문의</NavDropdown.Item>
                    </NavDropdown>
                    {/*<NavDropdown.Divider />*/}
                    {auth &&
                      <NavDropdown
                        title="마이페이지"
                        id="collapsible-nav-dropdown-introduce"
                      >
                        <NavDropdown.Item onClick={() => { navigate("/mypage") }}>내 정보</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigate("/cart") }}>장바구니</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigate("/favorite") }}>찜 목록</NavDropdown.Item>
                        {jwt.roles && jwt.roles[0] === "ROLE_ADMIN" &&
                          <NavDropdown.Item onClick={() => { navigate("/admin") }}>관리자</NavDropdown.Item>
                        }
                      </NavDropdown>
                    }
                    {!auth && <Nav.Link onClick={() => { navigate("/login") }}>로그인</Nav.Link>}
                    {!auth && <Nav.Link onClick={() => { navigate("/signup") }}>회원가입</Nav.Link>}
                    {auth && <Nav.Link onClick={logOutHandler}>로그아웃</Nav.Link>}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
      }
    </div>
  )
}
export default Header