import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) {
        return rejectWithValue('Token not found');
    }
    try {
        const response = await axios.get('http://localhost:5005/events', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axios.post('http://localhost:5005/events', eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axios.put(`http://localhost:5005/events/${eventId}`, eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { getState, rejectWithValue }) => {
    const { auth: { token } } = getState();
    if (!token) return rejectWithValue('Token not found');
    try {
        await axios.delete(`http://localhost:5005/events/${eventId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return eventId;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

const initialState = {
    events: [],
    status: 'idle',
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
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
            .addCase(createEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events.push(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                // Обновите состояние в соответствии с успешным завершением действия updateEvent
            })
            .addCase(updateEvent.rejected, (state, action) => {
                // Обработайте ситуацию, если действие updateEvent завершилось с ошибкой
            })
            .addCase(deleteEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                // Обновите состояние в соответствии с успешным завершением действия deleteEvent
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                // Обработайте ситуацию, если действие deleteEvent завершилось с ошибкой
            });
    },
});

export default eventsSlice.reducer;








