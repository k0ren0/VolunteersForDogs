// src/features/dogs/dogsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5005';

// Исправление: добавляем асинхронное действие fetchDogs
export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (_, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) {
        return rejectWithValue('No token provided');
    }
    try {
        const response = await axios.get(`${BASE_URL}/dogs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

// Асинхронное действие для добавления новой собаки
export const addDog = createAsyncThunk('dogs/addDog', async (dogData, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) {
        return rejectWithValue('No token provided');
    }
    try {
        const response = await axios.post(`${BASE_URL}/dogs`, dogData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Определите initialState и редьюсеры...
const dogsSlice = createSlice({
    name: 'dogs',
    initialState: {
        dogs: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Исправление: исправляем обработку действий fetchDogs
            .addCase(fetchDogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dogs = action.payload;
            })
            .addCase(fetchDogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Обработка addDog...
            .addCase(addDog.fulfilled, (state, action) => {
                state.dogs.push(action.payload);
            });
        // Можете добавить обработку других действий...
    },
});

export default dogsSlice.reducer;



// // src/features/dogs/dogsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (_, { getState, rejectWithValue }) => {
//   const { auth: { token } } = getState();
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axios.get('http://localhost:5005/dogs', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     return rejectWithValue(err.response.data);
//   }
// });

// const dogsSlice = createSlice({
//   name: 'dogs',
//   initialState: {
//     dogs: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDogs.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDogs.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.dogs = action.payload;
//       })
//       .addCase(fetchDogs.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload ? action.payload.message : 'Failed to fetch dogs';
//       });
//   },
// });

// export default dogsSlice.reducer;
