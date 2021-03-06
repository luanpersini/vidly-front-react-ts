import { Http } from './httpService'
import { apiUrl } from '../../config.json'
import { httpResponseHandler } from '../http/http-response-handler'
import jwtDecode from 'jwt-decode'

const http = Http()
const apiEndpoint = apiUrl + '/auth'
const tokenKey = 'token'

export const auth = {
  async login(email: any, password: any) {    
    const httpResponse = await http.request({
      url: apiEndpoint,
      method: 'post',
      body: { email: email, password: password }
    })
    const handle = [
      { action: 'InvalidCredentials'}    
    ]
    const jwt = httpResponseHandler(httpResponse, handle)
    localStorage.setItem(tokenKey, jwt)    
  },

  async getCurrentUser() {
    try {
      const jwt: any = await localStorage.getItem(tokenKey)
      return jwtDecode(jwt)
    } catch (ex) {
      return null
    }
  },

   logout() {
    localStorage.removeItem(tokenKey);
  }  
}

/*
import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
*/
