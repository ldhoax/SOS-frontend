import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string, password: string }, thunkAPI) => {
    try {
      console.log(`${import.meta.env.VITE_REQUEST_HOST}/api/v1/user/login`);
      const response = await fetch(`${import.meta.env.VITE_REQUEST_HOST}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || 'Login failed. Please try again.');
      }

      const { data } = await response.json();
      localStorage.setItem(import.meta.env.VITE_USER_TOKEN_KEY, data['token']);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
