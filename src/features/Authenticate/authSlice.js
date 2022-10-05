import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: null,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload = true }) => {
      state.loading = payload;
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
  },
});

export const { setLoading, login, logout, register } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthLoading = (state) => state.auth.loading;
export default authSlice.reducer;
