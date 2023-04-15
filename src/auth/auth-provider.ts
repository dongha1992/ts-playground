import Axios from 'axios';
const axios = Axios.create();

const localStorageKey = '__auth_provider_token__';

async function getToken() {
  // token 요청 api 콜해야함
  return window.localStorage.getItem(localStorageKey);
}

interface User {
  username: string;
  password: string;
}

function handleUserResponse({ user }: any) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

function login({ username, password }: User) {
  return authClient('login', { username, password }).then(handleUserResponse);
}

function register({ username, password }: User) {
  return authClient('login', { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = process.env.REACT_APP_AUTH;

async function authClient<Request = any>(endpoint: string, data: Request) {
  const url = `${authURL}/${endpoint}`;
  return axios.post<Response>(url, { data }).then(async response => {
    if (response.status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getToken, login, register, logout, localStorageKey };
