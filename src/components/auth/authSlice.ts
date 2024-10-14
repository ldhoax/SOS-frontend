import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authActions';

interface UserInfo {
  username: string;
  role: string;
}

interface AuthState {
  loading: boolean;
  userInfo: UserInfo;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: {
    username: '',
    role: localStorage.getItem(import.meta.env.VITE_USER_ROLE_KEY) || '',
  },
  userToken: localStorage.getItem(import.meta.env.VITE_USER_TOKEN_KEY) || null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
