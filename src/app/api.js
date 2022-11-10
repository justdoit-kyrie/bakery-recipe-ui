import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CODE, API_PATH, history, ROUTES_PATH } from '~/constants';
import { logout, setAccessToken } from '~/features/Authenticate/authSlice';
import { store } from './store';

const { dispatch } = store;

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
    ) {
      return config;
    }
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async function (response) {
    if (response && response.data) {
      if (+response.data?.code === API_CODE.tokenExp) {
        const state = store.getState();
        const { accessToken, refreshToken } = state.auth;

        const { code, data } = await axiosInstance.post(API_PATH.users.refresh, {
          accessToken,
          refreshToken,
        });

        if (+code === API_CODE.success) {
          dispatch(setAccessToken(data));
          const config = response.config;
          config.headers.Authorization = `Bearer ${data}`;
          return await axiosInstance(config);
        }
      }

      if (+response.data?.code === API_CODE.tokenInvalid) {
        toast.error('Token is invalid');
        dispatch(logout());
        return history.push(ROUTES_PATH.common.home);
      }
      return response.data;
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
