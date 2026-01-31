import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/axiosInstance';
import { updateJwt } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const Notice = () => {
  useEffect(() => {
    dispatch(updateJwt())
  }, [])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jwt = useSelector(state => state.jwt)

  const [notices, setNotices] = useState(undefined);
  const [listNotices, setListNotices] = useState([]);
  const [listIndex, setListIndex] = useState(0);

  useEffect(() => {
    axiosInstance.get("/board/NOTICE")
      .then(res => {
        setNotices(res.data);
        setListNotices(res.data.slice(0, 4));
        setListIndex(4);
      })
      .catch(err => console.error("공지 불러오기 실패", err));
  }, []);

  const handleLoadMore = () => {
    const nextIndex = listIndex + 4;
    setListNotices(prev => [...prev, ...notices.slice(listIndex, nextIndex)]);
    setListIndex(nextIndex);
  };

  if (!notices) {
    return <div>로딩중...</div>
  }
  else {
    const leftCarousel = notices.slice(1, 5);
    const rightCarousel = notices.slice(5, 9);
    return (

      <div style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundImage: `url(img/5.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        boxSizing: 'border-box'
      }}>

        {/* 최상단 공지 */}
        {(notices.length > 0) &&
          <div style={{
            maxWidth: '1100px',
            minHeight: '25vh',
            margin: '0 auto 20px auto',
            position: 'relative',
            borderRadius: "10px",
            overflow: 'hidden'
          }}>
            {/* 배경 이미지 */}
            <div style={{
              backgroundImage: `url(img/3.png)`,
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.8)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>

            {/* 공지 내용 (캐러셀과 같은 반투명 박스) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '80%',
              minWidth: '80%',
              minHeight: '80%'
            }}>
              <h2>{notices[0].title}</h2>
              <p>{parse(notices[0].content)}</p>
            </div>
          </div>
        }

        {/* 중간 캐러셀 2칸 */}
        {(notices.length > 4) &&
          < div style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '1100px',
            margin: '0 auto 20px auto',
            height: '400px' // 고정 높이
          }}>
            {/* 왼쪽 캐러셀 */}
            <div style={{ flex: 1, position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
              <Carousel interval={2500}>
                {leftCarousel.map((item, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={`/img/${idx + 11}.png`}
                      alt={`Slide ${idx}`}
                      style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      padding: '20px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      maxWidth: '80%',
                      minWidth: '70%',
                      minHeight: '40%'
                    }}>
                      <h5>{item.title}</h5>
                      <p>{parse(item.content)}</p>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* 오른쪽 캐러셀 */}
            <div style={{ flex: 1, position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
              <Carousel interval={3000}>
                {rightCarousel.map((item, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={`/img/${idx + 15}.png`}
                      alt={`Slide ${idx}`}
                      style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      padding: '20px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      maxWidth: '80%',
                      minWidth: '70%',
                      minHeight: '40%'
                    }}>
                      <h5>{item.title}</h5>
                      <p>{parse(item.content)}</p>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        }

        {/* 하단 큰 박스 + 공지 리스트 */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            padding: '20px',
            backgroundImage: `url(img/13.png)`
          }}>
            <h3>공지 리스트</h3>
            {listNotices.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '10px'
              }}>
                <h5>{item.title}</h5>
                <p>{parse(item.content)}</p>
              </div>
            ))}
            {listIndex < notices.length && (
              <button
                onClick={handleLoadMore}
                style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px' }}
              >
                더 보기
              </button>
            )}
          </div >
          {jwt.roles && jwt.roles[0] === "ROLE_ADMIN" && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={() => {
                  navigate("/write?from=notice")
                }}
                style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px' }}
              >
                글 등록
              </button>
            </div>
          )}
        </div>
      </div >
    );
  }
};

export default Notice;
