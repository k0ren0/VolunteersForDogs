import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // Assuming you have .env file configured with REACT_APP_API_URL
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

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        dogs: [],
        events: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDog.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dogs.push(action.payload);
            })
            .addCase(addDog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
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
            });
    },
});

export const selectUserProfile = (state) => state.users;

export default usersSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const REACT_APP_API_URL = 'http://localhost:5005';
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

// // Асинхронный thunk для получения пользователей
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

// // Асинхронный thunk для обновления профиля пользователя
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

// // Асинхронный thunk для добавления собаки
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

// // Асинхронный thunk для получения собак
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

// // Асинхронный thunk для получения событий
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

// // Функция для получения пользователя по ID (серверная часть)
// export const _getUserById = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         // Ваш код для получения пользователя из базы данных
//     } catch (error) {
//         console.error('Error getting user by ID:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Создаем slice для управления пользовательским состоянием
// const usersSlice = createSlice({
//     name: 'users',
//     initialState: {
//         users: [],
//         dogs: [],
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