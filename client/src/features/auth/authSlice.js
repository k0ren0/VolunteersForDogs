import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async ({ email, password, url }, { rejectWithValue }) => {
    try {
      console.log('Authenticating user...');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${url}`, {
        email,
        password,
      }, { withCredentials: true });
      console.log('Authentication response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: 'Network error or server is not responding' });
      }
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    user_id: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.user_id = action.payload.user_id || null; 
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
 
});

export const { logout } = authSlice.actions;

console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

export default authSlice.reducer;



