import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getToken = (getState) => {
    const { auth: { token } } = getState();
    return token;
};

// Обновление названия с fetchDogs на fetchEvents
export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.get('/events', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

// Добавление события остается без изменений
export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.post('/events', eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Удаление события остается без изменений
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        await axiosInstance.delete(`/events/${eventId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return eventId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Обновление события - исправлено получение токена
export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) {
        return rejectWithValue('Token not found'); // Использование единого формата сообщения об ошибке
    }
    try {
        const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


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
                // Предполагается, что события возвращаются в виде массива
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                // Добавление нового события в список
                state.events.push(action.payload);
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                // Фильтрация удаленного события из списка
                state.events = state.events.filter(event => event.id !== action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                // Обновление события в списке
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            });
    },
});

export default eventsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

// const axiosInstance = axios.create({
//     baseURL: REACT_APP_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// const getToken = (getState) => {
//     const { auth: { token } } = getState();
//     return token;
// };

// export const fetchEvents = createAsyncThunk('events/fetchDogs', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.get('/events', {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.toString());
//     }
// });

// export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.post('/events', eventData, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         await axiosInstance.delete(`/events/${eventId}`, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return eventId;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
//     const token = getState(getState);
//     if (!token) {
//         return rejectWithValue('No token provided');
//     }
//     try {
//         const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });



// const eventsSlice = createSlice({
//     name: 'events',
//     initialState: {
//         events: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchEvents.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload;
//             })
//             .addCase(fetchEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addEvent.fulfilled, (state, action) => {
//                 state.events.push(action.payload);
//             })

//             .addCase(deleteEvent.fulfilled, (state, action) => {
//                 state.events = state.events.filter(event => event.id !== action.payload);

//             })

//             .addCase(updateEvent.fulfilled, (state, action) => {
//                 const index = state.events.findIndex(event => event.id === action.payload.id);
//                 if (index !== -1) {
//                     state.events[index] = action.payload;
//                 }

//             });
//     },
// });

// export default eventsSlice.reducer;


//измененное но не заработало





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // Assuming you have .env file configured with REACT_APP_API_URL
// const axiosInstance = axios.create({
//     baseURL: REACT_APP_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//         return rejectWithValue('No token provided');
//     }
//     try {
//         const response = await axiosInstance.get('/events', {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.toString());
//     }
// });

// export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//         return rejectWithValue('No token provided');
//     }
//     try {
//         const response = await axiosInstance.post('/events', eventData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//         return rejectWithValue('No token provided');
//     }
//     try {
//         const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//         return rejectWithValue('No token provided');
//     }
//     try {
//         await axiosInstance.delete(`/events/${eventId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return eventId;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// const eventsSlice = createSlice({
//     name: 'events',
//     initialState: {
//         events: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchEvents.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload;
//             })
//             .addCase(fetchEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(createEvent.fulfilled, (state, action) => {
//                 state.events.push(action.payload);
//             })
//             .addCase(updateEvent.fulfilled, (state, action) => {
//                 const index = state.events.findIndex(event => event.id === action.payload.id);
//                 if (index !== -1) {
//                     state.events[index] = action.payload;
//                 }
//             })
//             .addCase(deleteEvent.fulfilled, (state, action) => {
//                 state.events = state.events.filter(event => event.id !== action.payload);
//             });
//     },
// });

// export default eventsSlice.reducer;


