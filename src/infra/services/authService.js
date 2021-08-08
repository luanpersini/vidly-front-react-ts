
export const auth = {

async login(email, password) {
  const { data: jwt } = '1234'
},
async getCurrentUser() {
  const user = {
      _id: { $oid: '60a178327476cd104886862f' },
      name: 'Luan PSG',
      email: 'luanpsg@gmail.com',
      password: '$2b$10$RX4j/xWlLQgViqNHPgUZYuFQsYC2yTGuZ3pQ2zN33dItpURq3aCHi'
    }
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