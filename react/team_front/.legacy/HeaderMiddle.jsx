import { useState } from "react"
import { Col, Container, ListGroup, Navbar, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

/**
 * Middle-sized header
 * @param {*} param0 
 * @returns 
 */
function HeaderMiddle({ auth, setAuth, roles, windowSize, location }) {
    const [openHeader, setOpenHeader] = useState(false)

    const navigate = useNavigate()
    const colMenuStyle = {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        padding: 0,
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
        width: "100%",
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
        backgroundColor: "white"
    }

    const rowItemsStyle = {
        width: "100%",
        maxHeight: openHeader ? "500px" : "0px",
        opacity: openHeader ? 1 : 0,
        transform: openHeader ? "translateY(0)" : "translateY(-20px)",
        overflow: "hidden",
        transition: "max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
    }

    const rowMenuStyle = {
        width: "100%",
        padding: 0,
        justifyContent: "space-around",
        display: "flex",
        flexWrap: "wrap",
    }

    function logOutHandler(e) {
        e.preventDefault()
        sessionStorage.removeItem("jwt")
        setAuth(false)
    }

    return (
        <div className="HeaderMiddle" onMouseLeave={() => setOpenHeader(false)} style={outerMostBoxStyle}>
            <Container fluid style={containerStyle}>
                <Row className="rowMenu" style={rowMenuStyle}>
                    <Col xs={2} className="col-logo" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <img onClick={() => { navigate("/") }} src={`${import.meta.env.BASE_URL}img/logo.png`} alt='Logo' width={'80px'} height={'80px'} style={{ cursor: "pointer" }}></img>
                    </Col>
                    <Col xs={10} className="col-menu" style={colMenuStyle}>
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
                                <ListGroup.Item action onClick={() => { navigate('/login') }} style={listItemStyle}>
                                    로그인
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="rowItems" style={rowItemsStyle}>
                    <Col xs={2}></Col>
                    <Col>
                        <ListGroup style={{ width: "100%", padding: 0 }}>
                            <ListGroup.Item onClick={() => navigate("/history")} action style={rowListItemStyle}>
                                회사 연혁
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => navigate("/locate")} action style={rowListItemStyle}>
                                매장 위치
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
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
                    <Col>
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
                    <Col>
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
                </Row>
            </Container>
        </div >
    )
}
export default HeaderMiddle