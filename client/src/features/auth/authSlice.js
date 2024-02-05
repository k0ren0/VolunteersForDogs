import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для аутентификации
export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async ({ email, password, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5005/users/${url}`, {
        email,
        password,
      }, { withCredentials: true });
      return response.data; // Предполагается, что ответ содержит токен
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Could not authenticate';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
