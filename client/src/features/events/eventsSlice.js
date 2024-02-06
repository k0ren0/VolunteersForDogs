import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5005/events';

// Функция для получения настроенного экземпляра axios с заголовками авторизации
const axiosWithAuth = (token) => {
    return axios.create({
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosWithAuth(token).get(baseURL);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Добавьте асинхронные thunks для других операций, используя axiosWithAuth для запросов

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : 'Failed to fetch events';
            });
        // Обработайте состояния для других async thunks...
    },
});

export default eventsSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
//   const { auth: { token } } = getState();
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axios.get('http://localhost:5005/events', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     return rejectWithValue(err.response.data);
//   }
// });

// export const eventsSlice = createSlice({
//   name: 'events',
//   initialState: {
//     events: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEvents.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchEvents.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.events = action.payload;
//       })
//       .addCase(fetchEvents.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload ? action.payload.message : 'Failed to fetch events';
//       });
//   },
// });

// export default eventsSlice.reducer;
