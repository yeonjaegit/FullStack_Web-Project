import axios from "axios";

/**
 * axios 사용시 들어갈 공통사항을 인스턴스화시킬 수 있음.
 * axios. 대신 axiosInstance.로 처리하면 됨.
 */
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 요청헤더에 jwt 추가해주는 함수. jwt는 세션 스토리지에서 가져옴.
 * @param {*} config 
 */
function addJwtToRequest(config) {
  const jwt = sessionStorage.getItem("jwt")

  if (jwt)
    config.headers['Authorization'] = jwt
  return config
}

/**
 * 메시지 팝업 메소드
 * @param {String} msg 
 */
function notice(msg){
  alert(msg)
  //get something else later
}

function responseHandler(response) {
  if (response.status == 200) {
    console.log("Success: ", response.data)
  } else if (response.status < 400) {
    console.warn("Unexpected", response.status)
  } else {
    console.error("Failure: ", response.message)
  }
  if (typeof response.data==='string')
    notice(response.data)
  return response
}

axiosInstance.interceptors.request.use(
  config => addJwtToRequest(config),
  error => Promise.reject(error)
)
axiosInstance.interceptors.response.use(
  response => responseHandler(response),
  error => { 
    console.error(error)
    if (error.response && typeof error.response.data==='string'){
      notice(error.response.data)
      console.error(error.response.data)
    }
    return error
  }
)

export default axiosInstance