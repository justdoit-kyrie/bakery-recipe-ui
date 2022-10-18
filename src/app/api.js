import axios from 'axios';
import { API_PATH, LOCAL_STORAGE_KEY } from '~/constants';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: { 'Content-type': 'application/json' },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if (
      config.url === API_PATH.users.login ||
      config.url === API_PATH.users.register ||
      config.url === API_PATH.users.refresh
    )
      return config;

    const { accessToken } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken));

    config.headers.Authorization = `Bearer ${accessToken.replaceAll('"', '')}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
