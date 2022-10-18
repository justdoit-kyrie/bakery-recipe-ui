import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    login: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
    },
    register: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
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
