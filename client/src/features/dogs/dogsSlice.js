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

export const fetchUserDogs = createAsyncThunk('dogs/fetchUserDogs', async (_, { getState, rejectWithValue }) => {
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

export const deleteDog = createAsyncThunk('dogs/deleteDog', async (dogId, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        await axiosInstance.delete(`/dogs/${dogId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return dogId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateDog = createAsyncThunk('dogs/updateDog', async ({ dogId, dogData }, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.put(`/dogs/${dogId}`, dogData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const selectUserDogs = (state) => state.dogs.dogs;

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
            .addCase(fetchUserDogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dogs = action.payload;
            })
            .addCase(fetchUserDogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDog.fulfilled, (state, action) => {
                state.dogs.push(action.payload);
            })
            .addCase(deleteDog.fulfilled, (state, action) => {
                state.dogs = state.dogs.filter(dog => dog.dog_id !== action.payload);
            })
            .addCase(updateDog.fulfilled, (state, action) => {
                const index = state.dogs.findIndex(dog => dog.dog_id === action.payload.dog_id);
                if (index !== -1) {
                    state.dogs[index] = action.payload;
                }
            });
    },
});

export default dogsSlice.reducer;





