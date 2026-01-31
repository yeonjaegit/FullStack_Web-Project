import { configureStore, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axios/axiosInstance";

/**
 * windowSize
 */
const windowSize = createSlice({
  name: 'windowSize',
  initialState: { width: undefined, height: undefined },
  reducers: {
    updateWindowSize() {
      return { width: window.innerWidth, height: window.innerHeight }
    }
  }
})
export const { updateWindowSize } = windowSize.actions

/**
 * jwt
 */
const jwt = createSlice({
  name: 'jwt',
  initialState: { id: undefined, sub: undefined, exp: undefined, roles: undefined },
  reducers: {
    /**
     * read jwt from session storage
     * @param {*} state 
     */
    updateJwt(state) {
      let jwt = sessionStorage.getItem("jwt")
      if (jwt) {
        jwt = jwtDecode(jwt)
        state.id = jwt.id
        state.sub = jwt.sub
        state.exp = jwt.exp
        state.roles = jwt.roles
      }
    },
    removeJwt() {
      sessionStorage.removeItem("jwt")
      return { id: undefined, sub: undefined, exp: undefined, roles: undefined }
    },
    /**
     * store encoded payload in session storage and save in state
     * @param {*} state 
     * @param {*} action 
     * @returns 
     */
    setJwt(state, action) {
      let jwt = action.payload
      sessionStorage.setItem("jwt", action.payload)
      jwt = jwtDecode(jwt)
      return { id: jwt.id, sub: jwt.sub, exp: jwt.exp, roles: jwt.roles }
    }
  },
})
export const { updateJwt, removeJwt, setJwt } = jwt.actions

/**
 * Authorization flag. If valid, yield true, otherwise false.
 */
const auth = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    authorize() {
      return true;
    },
    unauthorize() {
      return false
    },
  }
})
export const { authorize, unauthorize } = auth.actions

export default configureStore({
  reducer: {
    windowSize: windowSize.reducer,
    jwt: jwt.reducer,
    auth: auth.reducer,
  }
})