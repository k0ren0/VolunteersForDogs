import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // Assuming you have .env file configured with REACT_APP_API_URL
const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
        return rejectWithValue('No token provided');
    }
    try {
        const response = await axiosInstance.get('/events', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
        return rejectWithValue('No token provided');
    }
    try {
        const response = await axiosInstance.post('/events', eventData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
        return rejectWithValue('No token provided');
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

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
        return rejectWithValue('No token provided');
    }
    try {
        await axiosInstance.delete(`/events/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return eventId;
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
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event.id !== action.payload);
            });
    },
});

export default eventsSlice.reducer;


