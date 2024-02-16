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

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get('/events');
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.error || error.message);
//     }
// });

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    
    try {
        const response = await axiosInstance.get(`/events`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { rejectWithValue }) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await axiosInstance.get(`/events?${queryString}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || error.message);
    }
});

export const fetchUserEvents = createAsyncThunk('events/fetchUserEvents', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    
    const { auth: { user_id } } = getState();

    try {
        const response = await axiosInstance.get(`/events/${user_id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

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

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (event_id, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        await axiosInstance.delete(`/events/${event_id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return event_id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ event_id, eventData }, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        await axiosInstance.update(`/events/${event_id}`, eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return eventData;
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
        isEditing: null,
    },
    reducers: {
        setEditingEventId(state, action) {
            state.isEditing = action.payload;
        },
        clearEditingEventId(state) {
            state.isEditing = null;
        },
    },
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
                state.error = action.payload;
            })
            .addCase(fetchFilteredEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchFilteredEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchUserEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchUserEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event.event_id !== action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event.event_id === action.payload.event_id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                    state.isEditing = null;
                }
            });
    },
});

export const { setEditingEventId, clearEditingEventId } = eventsSlice.actions;

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

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get('/events');
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.error || error.message);
//     }
// });

// export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { rejectWithValue }) => {
//     try {
//         const queryString = new URLSearchParams(filters).toString();
//         const response = await axiosInstance.get(`/events?${queryString}`);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.error || error.message);
//     }
// });

// export const fetchUserEvents = createAsyncThunk('events/fetchUserEvents', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
    
//     // Извлечение user_id из состояния
//     const { auth: { user_id } } = getState(); // Убедитесь, что путь к user_id соответствует вашей структуре состояния

//     try {
//         const response = await axiosInstance.get(`/events/${user_id}`, { // Исправленный URL, если нужно
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

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (event_id, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         await axiosInstance.delete(`/events/${event_id}`, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return event_id;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ event_id, eventData }, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.put(`/events/${event_id}`, eventData, {
//             headers: { 'Authorization': `Bearer ${token}` },
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
//                 state.error = action.payload;
//             })
//             .addCase(fetchFilteredEvents.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchFilteredEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload;
//             })
//             .addCase(fetchFilteredEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload;
//             })
//             .addCase(fetchUserEvents.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUserEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload;
//             })
//             .addCase(fetchUserEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload;
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


////// localstorage!!!! /////



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) {
//   throw new Error('REACT_APP_API_URL is not defined');
// }

// const axiosInstance = axios.create({
//   baseURL: REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get('/events');
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.error || error.message);
//   }
// });

// export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { rejectWithValue }) => {
//   try {
//     const queryString = new URLSearchParams(filters).toString();
//     const response = await axiosInstance.get(`/events?${queryString}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.error || error.message);
//   }
// });

// export const fetchUserEvents = createAsyncThunk('events/fetchUserEvents', async (_, { getState, rejectWithValue }) => {
//     const { user_id } = getState().auth; // Получаем идентификатор пользователя из состояния
//     if (!user_id) return rejectWithValue('User ID not found');
//     try {
//         const response = await axiosInstance.get(`/events/user/${user_id}/events`);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.error || error.message);
//     }
// });


// export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/events', eventData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.error || error.message);
//   }
// });

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { rejectWithValue }) => {
//   try {
//     await axiosInstance.delete(`/events/${eventId}`);
//     return eventId;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.error || error.message);
//   }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.put(`/events/${eventId}`, eventData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.error || error.message);
//   }
// });

// const eventsSlice = createSlice({
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
//         state.error = action.payload;
//       })
//       .addCase(addEvent.fulfilled, (state, action) => {
//         state.events.push(action.payload);
//       })
//       .addCase(deleteEvent.fulfilled, (state, action) => {
//         state.events = state.events.filter(event => event.event_id !== action.payload);
//       })
//       .addCase(updateEvent.fulfilled, (state, action) => {
//         const index = state.events.findIndex(event => event.event_id === action.payload.event_id);
//         if (index !== -1) {
//           state.events[index] = action.payload;
//         }
//       })
//       .addCase(fetchFilteredEvents.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchFilteredEvents.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.events = action.payload;
//       })
//       .addCase(fetchFilteredEvents.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchUserEvents.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserEvents.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.events = action.payload;
//       })
//       .addCase(fetchUserEvents.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default eventsSlice.reducer;



