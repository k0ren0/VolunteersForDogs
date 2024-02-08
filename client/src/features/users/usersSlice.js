import { db } from "../../../../server/config/db.js";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5005';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getToken = (getState) => {
    const { auth: { token } } = getState();
    return token;
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.get('/users', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateUserProfile = createAsyncThunk('users/updateUserProfile', async ({ userId, userData }, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, userData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const addDog = createAsyncThunk('users/addDog', async (dogData, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.post('/dogs', dogData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchDogs = createAsyncThunk('users/fetchDogs', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.get('/dogs', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchEvents = createAsyncThunk('users/fetchEvents', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.get('/events', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const _getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await db('users')
            .select('users.*', 'roles.role_name')
            .leftJoin('roles', 'users.role_id', 'roles.role_id')
            .where('user_id', userId)
            .first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        dogs: [],
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
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) state.users[index] = action.payload;
            })
            .addCase(addDog.fulfilled, (state, action) => {
                state.dogs.push(action.payload);
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.dogs = action.payload;
            });
    },
});

export default usersSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // URL сервера
// const BASE_URL = 'http://localhost:5005';

// // Используем axios для выполнения HTTP-запросов
// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Получение токена для запросов
// const getToken = (getState) => {
//     const { auth: { token } } = getState();
//     return token;
// };

// // Получение информации о пользователях
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.get('/users', {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// // Обновление профиля пользователя
// export const updateUserProfile = createAsyncThunk('users/updateUserProfile', async ({ userId, userData }, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.put(`/users/profile/${userId}`, userData, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// // Добавление собаки
// export const addDog = createAsyncThunk('users/addDog', async (dogData, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.post('/dogs', dogData, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// // Получение списка собак
// export const fetchDogs = createAsyncThunk('users/fetchDogs', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.get('/dogs', {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// export const fetchEvents = createAsyncThunk('users/fetchEvents', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.get('/events', {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });

// const usersSlice = createSlice({
//     name: 'users',
//     initialState: {
//         users: [],
//         dogs: [],
//         events: [], // Добавляем новое поле для списка событий
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Добавляем обработчики для нового действия fetchEvents
//             .addCase(fetchEvents.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload; // Обновляем список событий
//             })
//             .addCase(fetchEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             // Добавляем обработчики для уже существующих действий
//             .addCase(fetchUsers.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.users = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(updateUserProfile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 const index = state.users.findIndex(user => user.id === action.payload.id);
//                 if (index !== -1) state.users[index] = action.payload;
//             })
//             .addCase(addDog.fulfilled, (state, action) => {
//                 state.dogs.push(action.payload);
//             })
//             .addCase(fetchDogs.fulfilled, (state, action) => {
//                 state.dogs = action.payload;
//             });
//     },
// });

// export default usersSlice.reducer;