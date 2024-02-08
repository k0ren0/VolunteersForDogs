// dogsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REACT_APP_API_URL = 'http://localhost:5005';
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

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.get('/dogs', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const addDog = createAsyncThunk('dogs/addDog', async (dogData, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.post('/dogs', dogData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
            .addCase(addDog.fulfilled, (state, action) => {
                state.dogs.push(action.payload);
            });
    },
});

export default dogsSlice.reducer;



