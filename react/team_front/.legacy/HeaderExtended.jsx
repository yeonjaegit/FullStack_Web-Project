import { useState } from "react"
import { Col, Container, ListGroup, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

/**
 * Extended header
 * @returns 
 */
function HeaderExtended({ auth, setAuth, roles, windowSize, location }) {
    let menuWidth = 1300

    const [openHeader, setOpenHeader] = useState(false)

    const navigate = useNavigate()
    const colMenuStyle = {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        padding: 0
    }
    const menuListGroupStyle = {
        border: "none",
        width: "100%",
        justifyContent: "center",
        padding: 0
    }

    const listItemStyle = {
        border: "none",
        fontWeight: "bold"
    }

    const rowListItemStyle = {
        border: "none",
        textAlign: "center"
    }

    const containerStyle = {
        width: menuWidth,
        padding: 0,
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    }

    const outerMostBoxStyle = {
        position: location.pathname === "/" ? "fixed" : "sticky",
        zIndex: 100,
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        display: "flex",
    }

    const rowItemsStyle = {
        width: windowSize>1300?"100%":menuWidth,
        maxHeight: openHeader ? "500px" : "0px",
        opacity: openHeader ? 1 : 0,
        transform: openHeader ? "translateY(0)" : "translateY(-20px)",
        overflow: "hidden",
        transition: "max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
    }

    const colIconsStyle = {
        textAlign: "center",
    }

    function logOutHandler(e) {
        e.preventDefault()
        sessionStorage.removeItem("jwt")
        setAuth(false)
    }

    return (
        <div className="HeaderExtended" onMouseLeave={() => setOpenHeader(false)} style={outerMostBoxStyle}>
            <Container fluid style={containerStyle}>
                <Row className="rowMenu" style={{ width: "100%" }}>
                    <Col xs={2} className="col-logo" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/logo.png`} alt='Logo' width={'80px'} height={'80px'} style={{ cursor: "pointer" }}></img>
                        <div onClick={() => { navigate("/") }} style={{ cursor: "pointer", fontWeight: 700 }}>RoomCorner Cafe</div>
                    </Col>
                    <Col xs={8} className="col-menu" style={colMenuStyle}>
                        <ListGroup horizontal style={menuListGroupStyle}
                            onMouseEnter={() => setOpenHeader(true)}>
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
                                <ListGroup.Item onClick={() => {navigate("/login")}} action style={listItemStyle}>
                                    로그인
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={2} className="col-icons" style={colIconsStyle}>
                        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/sns_blog.png`} />
                        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/facebook.png`} />
                        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/instagram.png`} />
                        <i className="fa-solid fa-heart"></i>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Col>
                </Row>
                <Row className="rowItems" style={rowItemsStyle}>
                    <Col xs={2}></Col>
                    <Col xs={2}>
                        <ListGroup style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <ListGroup.Item onClick={() => navigate("/history")} action style={rowListItemStyle}>
                                회사 연혁
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => navigate("/locate")} action style={rowListItemStyle}>
                                매장 위치
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={2}>
                        <ListGroup>
                            <ListGroup.Item onClick={() => navigate("/category?menu=espresso")} action style={rowListItemStyle}>
                                에스프레소
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => navigate("/category?menu=brewing")} action style={rowListItemStyle}>
                                브루잉
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => navigate("/category?menu=blended")} action style={rowListItemStyle}>
                                블렌디드
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={2}>
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
                    <Col xs={2}>
                        <ListGroup>
                            {auth ? (
                                <>
                                    <ListGroup.Item onClick={() => navigate("/mypage")} action style={rowListItemStyle}>
                                        내 정보
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={logOutHandler} action style={rowListItemStyle}>
                                        로그아웃
                                    </ListGroup.Item>
                                    {roles && roles[0] === "ROLE_ADMIN" && (
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
                    <Col xs={2}></Col>
                </Row>
            </Container>
        </div >
    )
}
export default HeaderExtended
