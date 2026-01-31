import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Login from './pages/account/Login'
import Signup from './pages/account/Signup'
import Index from './pages/Index'
import Detail from './pages/product/Detail'
import Board from './pages/community/Board'
import Write from './pages/community/Write'
import BoardContent from './pages/community/BoardContent'
import Location from './pages/about/Location'
import History from './pages/about/History'
import Upload from './pages/Upload'
import Category from './pages/product/Category'

import { dummyData, dummyData2, dummyData3 } from './data/dummy'
import Inquiry from './pages/community/Inquiry'
import { useEffect } from 'react'
import PleaseLogin from './pages/account/PleaseLogin'
import ProductUpload from './pages/product/ProductUpload'
import Bread from './components/Bread'
import MyPage from './pages/account/MyPage'
import Administration from './pages/Administration'
import Header from './components/Header'
import Notice from './pages/community/Notice'
import Cart from './pages/product/Cart'
import Favorite from './pages/product/Favorite'
import { authorize, updateJwt, updateWindowSize } from './redux/store'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const location=useLocation()
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  /**
   * window resize handler. activates when resize event takes place
   */
  function resizeHandler(){
    dispatch(updateWindowSize())
  }
  
  useEffect(()=>{
    dispatch(updateJwt())
    dispatch(authorize())
    
    window.addEventListener("resize", resizeHandler)
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler)
  }, [])
  
  return (
    <div className="App">
      
      <Header location={location}/>
      <Bread location={location}/>
      <Routes>
        <Route path="/" element={
        <Index /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
         
        <Route path='/category' element={<Category />} />
        {/* <Route path='/advertisement' element={<Advertisement />} /> */}
        
        <Route path="/board" element={auth? <Board /> : <PleaseLogin />} />
        <Route path='/board/1' element={auth? <BoardContent /> : <PleaseLogin />} />
        <Route path='/inquiry' element={auth? <Inquiry /> : <PleaseLogin />} />
        
        <Route path="/detail/:id" element={<Detail />} />
        
        <Route path="/write" element={auth? <Write /> : <PleaseLogin />} />
        <Route path='/upload' element={auth? <Upload /> : <PleaseLogin />} />
        <Route path='/productupload' element={auth? <ProductUpload /> : <PleaseLogin />} />
          
        <Route path='/locate' element={<Location />} />
        <Route path='/history' element={<History />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/admin' element={<Administration />} />

        <Route path='/cart' element={auth? <Cart /> : <PleaseLogin />} />
        <Route path='/favorite' element={auth? <Favorite /> : <PleaseLogin />} />
      </Routes>
      {location.pathname!=="/" && <Footer />}
    </div>
  );
}

export default App;
