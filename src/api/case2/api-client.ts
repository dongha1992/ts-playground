import axios, { AxiosError } from 'axios';
// import { QueryCache } from 'react-query';
import * as auth from 'auth/auth-provider';

const apiURL = process.env.REACT_APP_API_URL;

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

apiClient.interceptors.response.use(
  async response => {
    if (response.status === 401) {
      // TODO: 쿼리 추가해야함
      // QueryCache.clear();
      await auth.logout();
      // refresh the page for them
      window.location.assign(window.location.href);
      return Promise.reject({ message: '다시 인증해주세요.' });
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(req => {
  // req.headers!.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('USER') ?? '{}').token ?? ''}`;
  return req;
});
