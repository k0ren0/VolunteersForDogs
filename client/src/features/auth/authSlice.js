import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async ({ email, password, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5005/users/${url}`, {
        email,
        password,
      }, { withCredentials: true });
      return response.data;
    } catch (err) {
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
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const authenticateUser = createAsyncThunk(
//   'auth/authenticate',
//   async ({ email, password, username, url }, { rejectWithValue }) => { // Добавляем username в параметры
//     try {
//       const response = await axios.post(`http://localhost:5005/users/${url}`, {
//         email,
//         password,
//         username, // Передаем username
//       }, { withCredentials: true });
//       return response.data;
//     } catch (err) {
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
//       })
//       .addCase(authenticateUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Асинхронный thunk для аутентификации
// export const authenticateUser = createAsyncThunk(
//   'auth/authenticate',
//   async ({ email, password, url }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`http://localhost:5005/users/${url}`, {
//         email,
//         password,
//       }, { withCredentials: true });
//       return response.data; // Предполагается, что ответ содержит необходимые данные, например токен
//     } catch (err) {
//       // Проверяем, есть ли информация об ошибке, и возвращаем её
//       if (err.response && err.response.data) {
//         return rejectWithValue(err.response.data);
//       } else {
//         // Возвращаем общее сообщение об ошибке, если ответ от сервера отсутствует
//         return rejectWithValue({ message: 'Network error or server is not responding' });
//       }
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null, // Добавлено для хранения данных пользователя, если потребуется
//     token: null,
//     status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//     // Можно добавить дополнительные редьюсеры для обработки других действий, связанных с аутентификацией
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(authenticateUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Очищаем ошибки при новой попытке аутентификации
//       })
//       .addCase(authenticateUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.token = action.payload.token; // Предполагается, что payload содержит токен
//         state.user = action.payload.user; // Если сервер возвращает данные пользователя, сохраняем их
//       })
//       .addCase(authenticateUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload.message; // Используем сообщение об ошибке из payload
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;



