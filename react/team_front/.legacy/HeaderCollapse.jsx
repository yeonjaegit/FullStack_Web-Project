import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router-dom'

/**
 * Collapsed header
 * @param {*} props
 * @returns 
 */
function HeaderCollapse({ auth, setAuth, roles, windowSize, location}) {
  const [showIntroduce, setShowIntroduce] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showNotice, setShowNotice] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const navigate = useNavigate()

  function logOutHandler(e) {
    e.preventDefault()
    sessionStorage.removeItem("jwt")
    setAuth(false)
  }

  const handleDropdownEnter = (setter) => () => {
    if (windowSize.width > 996) {
      setTimeout(() => {
        setter(true)
      }, 200)
    }
  }

  const handleDropdownLeave = (setter) => () => {
    if (windowSize.width > 996) {
      setTimeout(() => {
        setter(false)
      }, 200)
    }
  }

  const handleDropdownClick = (setter, value) => {
    if (!(windowSize.width > 996)) {
      setter(!value)
    }
  }

  const outerMostBoxStyle = {
    position:location.pathname==="/"?"fixed":"sticky",
    zIndex:100,
    top:0,
    left:0,
    width:"100%",
    backgroundColor:"white"
  }

  return (
    <div className="Header" style={outerMostBoxStyle}>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <div className="col-logo" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "80px" }}>
            <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/logo.png`} alt='Logo' width={'80px'} height={'80px'} style={{ cursor: "pointer" }}></img>
          </div>
          <Navbar.Brand onClick={() => { navigate("/") }} style={{ cursor: "pointer", fontWeight: 700 }}>RoomCorner{<br></br>}Cafe</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ width: "100%", justifyContent: "space-around" }}>
              <NavDropdown
                title="회사 소개"
                id="collapsible-nav-dropdown-introduce"
                show={showIntroduce}
                onMouseEnter={handleDropdownEnter(setShowIntroduce)}
                onMouseLeave={handleDropdownLeave(setShowIntroduce)}
                onClick={() => handleDropdownClick(setShowIntroduce, showIntroduce)}>
                <NavDropdown.Item onClick={() => { navigate("/history") }}>회사 연혁</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/locate") }}>매장 위치</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="커피 메뉴"
                id="collapsible-nav-dropdown-menu"
                show={showMenu}
                onMouseEnter={handleDropdownEnter(setShowMenu)}
                onMouseLeave={handleDropdownLeave(setShowMenu)}
                onClick={() => { handleDropdownClick(setShowMenu, showMenu) }}>
                <NavDropdown.Item onClick={() => { navigate("/category?menu=espresso") }}>에스프레소</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/category?menu=brewing") }}>브루잉</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/category?menu=blended") }}>블렌디드</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="커뮤니티"
                id="collapsible-nav-dropdown-Notice"
                show={showNotice}
                onMouseEnter={handleDropdownEnter(setShowNotice)}
                onMouseLeave={handleDropdownLeave(setShowNotice)}
                onClick={() => { handleDropdownClick(setShowNotice, showNotice) }}>
                <NavDropdown.Item onClick={() => { navigate("/#") }}>공지사항</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/board") }}>게시판</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate("/inquiry") }}>1:1 문의</NavDropdown.Item>
              </NavDropdown>
              {/*<NavDropdown.Divider />*/}
              {auth && 
                <NavDropdown
                  title="마이페이지"
                  id="collapsible-nav-dropdown-introduce"
                  show={showManager}
                  onMouseEnter={handleDropdownEnter(setShowManager)}
                  onClick={() => handleDropdownClick(setShowManager, showManager)}>
                  <NavDropdown.Item onClick={() => { navigate("/mypage") }}>내 정보</NavDropdown.Item>
                  { roles && roles[0] === "ROLE_ADMIN" &&
                    <NavDropdown.Item onClick={() => { navigate("/admin") }}>관리자</NavDropdown.Item>
                  }
                </NavDropdown>
              }
              {auth ? "" : <Nav.Link onClick={() => { navigate("/login") }}>로그인</Nav.Link>}
              {auth ? "" : <Nav.Link onClick={() => { navigate("/signup") }}>회원가입</Nav.Link>}
              {auth ? <Nav.Link onClick={logOutHandler}>로그아웃</Nav.Link> : ""}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )

}
export default HeaderCollapse