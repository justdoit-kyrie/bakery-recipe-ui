import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  userInfo: null,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    login: (state, { payload: { userInfo, accessToken, refreshToken } }) => {
      state.loading = false;
      state.userInfo = userInfo;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
    register: (state, { payload: { userInfo } }) => {
      state.loading = false;
      state.userInfo = userInfo;
    },
    failed: (state) => {
      state.loading = false;
    },
  },
});

export const { setUserInfo, login, logout, register, failed } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthLoading = (state) => state.auth.loading;
export default authSlice.reducer;
