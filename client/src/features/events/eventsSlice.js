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

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
  const token = getToken(getState);
  if (!token) {
    return rejectWithValue('Token not found');
  }
  try {
    const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { getState, rejectWithValue }) => {
  const token = getToken(getState);
  if (!token) return rejectWithValue('Token not found');
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`/events?${queryString}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
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
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
        }
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
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;


////////////last

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

// const axiosInstance = axios.create({
//   baseURL: REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const getToken = (getState) => {
//   const { auth: { token } } = getState();
//   return token;
// };

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axiosInstance.get('/events', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
//   }
// });

// export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axiosInstance.post('/events', eventData, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     await axiosInstance.delete(`/events/${eventId}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return eventId;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) {
//     return rejectWithValue('Token not found');
//   }
//   try {
//     const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const queryString = new URLSearchParams(filters).toString();
//     const response = await axiosInstance.get(`/events?${queryString}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
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
//         state.error = action.error.message;
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
//         state.error = action.error.message;
//       });
//   },
// });

// export default eventsSlice.reducer;



////////worked

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { fetchUserDogs } from '../dogs/dogsSlice';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

// const axiosInstance = axios.create({
//   baseURL: REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const getToken = (getState) => {
//   const { auth: { token } } = getState();
//   return token;
// };

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axiosInstance.get('/events', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
//   }
// });

// // export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
// //   const token = getToken(getState);
// //   if (!token) return rejectWithValue('Token not found');
// //   try {
// //     const response = await axiosInstance.post('/events', eventData, {
// //       headers: { 'Authorization': `Bearer ${token}` },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     return rejectWithValue(error.response.data);
// //   }
// // });
// export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//       const response = await axiosInstance.post('/events', eventData, {
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   });
  
// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     await axiosInstance.delete(`/events/${eventId}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return eventId;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) {
//     return rejectWithValue('Token not found');
//   }
//   try {
//     const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const queryString = new URLSearchParams(filters).toString();
//     const response = await axiosInstance.get(`/events?${queryString}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
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
//         state.error = action.error.message;
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
//         state.error = action.error.message;
//       });
//   },
// });

// export default eventsSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

// const axiosInstance = axios.create({
//   baseURL: REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const getToken = (getState) => {
//   const { auth: { token } } = getState();
//   return token;
// };

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axiosInstance.get('/events', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
//   }
// });

// export const addEvent = createAsyncThunk('events/addEvent', async (eventData, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const response = await axiosInstance.post('/events', eventData, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     await axiosInstance.delete(`/events/${eventId}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return eventId;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) {
//     return rejectWithValue('Token not found');
//   }
//   try {
//     const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// export const fetchFilteredEvents = createAsyncThunk('events/fetchFilteredEvents', async (filters, { getState, rejectWithValue }) => {
//   const token = getToken(getState);
//   if (!token) return rejectWithValue('Token not found');
//   try {
//     const queryString = new URLSearchParams(filters).toString();
//     const response = await axiosInstance.get(`/events?${queryString}`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.toString());
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
//         state.error = action.error.message;
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
//         state.error = action.error.message;
//       });
//   },
// });

// export default eventsSlice.reducer;
