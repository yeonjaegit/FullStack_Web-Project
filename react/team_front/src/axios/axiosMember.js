import axiosInstance from "../axios/axiosInstance";
import { authorize, unauthorize, removeJwt, setJwt } from "../redux/store";


async function _login(dispatch, user, onFullfilled, onRejected) {
  await axiosInstance
    .post('/login', user)
    .then(response => {
      let jwt = response.headers.authorization
      dispatch(setJwt(jwt))
      dispatch(authorize())
      onFullfilled && onFullfilled(response)
    })
    .catch(error => onRejected && onRejected(error))
}

async function _signup(user, onFullfilled, onRejected) {
  await axiosInstance
    .post('/signup', user)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _logout(dispatch) {
  if (confirm("로그아웃 하시겠습니까?")) {
    dispatch(removeJwt())
    dispatch(unauthorize())
  }
}

const axiosMember = {
  /**
   * log in
   * @param {dispatch} dispatch 
   * @param {any} payload 
   * @param {function} onFullfilled
   * @param {funciton} onRejected
   */
  login: _login,
  /**
   * log out
   * @param {dispatch} dispatch 
   */
  logout: _logout,
  /**
   * sign up
   * @param {dispatch} dispatch 
   */
  signup: _signup,
}

export default axiosMember