import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import jwt from "../common/jwt"
import http from "../http"

export default new Vuex.Store({
  // count state 속성 추가
  state: {
    count: 0, // count 를 0 으로 초기화
    token: {
      accessToken: jwt.getToken(),
      
    }, // 토큰정보
    isAuthenticated: !!jwt.getToken(),
  },
  getters: {
    getAccessToken: function (state) {
      return state.token.accessToken
    },
    getRefreshToken: function (state) {
      return state.token.refreshToken
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated
    },
  },
  mutations: {
    logout: function (state = {}) {
      state.token.accessToken = ""
      state.isAuthenticated = false
      jwt.destroyToken()
      jwt.destroyRefreshToken()
    },
    login: function (state, payload = {}) {
      state.token.accessToken = payload.accessToken
      state.isAuthenticated = true
      jwt.saveToken(payload.accessToken)
      jwt.saveRefreshToken(payload.refreshToken)
    },
  },
  actions: {
    logout: function (context, payload) {
      
      return new Promise(resolve => {
        setTimeout(function () {
          context.commit("logout", payload)
          resolve({})
        }, 1000)
      })
    },
    join: function (context, payload) {
      let params = {
        email: payload.email,
        password: payload.password,
        nickname: payload.nickname,
      }
      return new Promise((resolve, reject) => {
        http
          .post("/api/join", params)
          .then(response => {

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    login: function (context, payload) {
      let params = {
        email: payload.email,
        password: payload.password,
      }
      return new Promise((resolve, reject) => {
        http
          .post("/api/login", params)
          .then(response => {
            const { data } = response
            console.log(data);
            context.commit("login", {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  
})