import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async ({ email, password, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${url}`, {
        email,
        password,
      }, { withCredentials: true });

    
      console.log('Authentication response:', response.data);

      // Adds logs
      if (response.data.user) {
        console.log('User data:', response.data.user);
      } else {
        console.log('No user data in response');
      }

      const { token, user } = response.data;
      // Log user_id, if availeble 
      console.log('User ID:', user?.user_id);

      return { token, user, user_id: user?.user_id };
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response && err.response.data) {
        console.error('Error response data:', err.response.data);
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
    login: (state, action) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id; // Save user_id
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.user_id = null; // set user_id to null at enter
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
        state.user_id = action.payload.user_id;
        console.log('User authenticated with ID:', state.user_id); //delete to secure
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

// Удаление console.log рекомендуется перед деплоем в production
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const authenticateUser = createAsyncThunk(
//   'auth/authenticate',
//   async ({ email, password, url }, { rejectWithValue }) => {
//     try {
//       console.log('Authenticating user...');
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${url}`, {
//         email,
//         password,
//       }, { withCredentials: true });
//       console.log('Authentication response:', response.data);
//       return response.data;
//     } catch (err) {
//       console.error('Authentication error:', err);
//       if (err.response && err.response.data) {
//         return rejectWithValue(err.response.data);
//       } else {
//         return rejectWithValue({ message: 'Network error or server is not responding' });
//       }
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     user_id: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(authenticateUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(authenticateUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.user_id = action.payload.user_id || null; // Сохраняем идентификатор пользователя в состоянии
//         console.log('User ID:', state.user_id); // Вывод идентификатора пользователя в консоль для отладки
//     })
//       .addCase(authenticateUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

// export default authSlice.reducer;



