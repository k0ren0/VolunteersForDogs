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

const getToken = (state) => state.auth.token;

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId, { getState, rejectWithValue }) => {
      const token = getToken(getState);
      if (!token) return rejectWithValue('Token not found');
      try {
        const response = await axiosInstance.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        console.error('Error fetching user profile:', errorMessage); 
        return rejectWithValue(errorMessage);
      }
    }
  );
  

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

export const updateUserById = createAsyncThunk('users/updateUserById', async ({ userId, userData }, { getState, rejectWithValue }) => {
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
    const user_id = getState().auth.user_id;   

    if (!token) return rejectWithValue('Token not found');
    if (!user_id) return rejectWithValue('User ID not found');   

    try {
        const dataWithUserId = { ...dogData, user_id };   
        const response = await axiosInstance.post('/dogs', dataWithUserId, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchDogs = createAsyncThunk('users/fetchDogs', async (_, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    const user_id = getState().auth.user_id;   

    if (!token) return rejectWithValue('Token not found');
    if (!user_id) return rejectWithValue('User ID not found');   

    try {
        const response = await axiosInstance.get(`/dogs?user_id=${user_id}`, {
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

export const fetchUserEvents = createAsyncThunk(
    'users/fetchUserEvents',
    async (userId, { getState, rejectWithValue }) => {
      const token = getToken(getState);
      if (!token) return rejectWithValue('Token not found');
      try {
        const response = await axiosInstance.get(`/users/${userId}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.post('/events', eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    const token = getToken(getState);
    if (!token) return rejectWithValue('Token not found');
    try {
        const response = await axiosInstance.put(`/events/${eventId}`, eventData, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
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
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
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
            .addCase(updateUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateUserById.rejected, (state, action) => {
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

export const selectUserById = (state) => state.users.user;
export const selectDogs = (state) => state.users.dogs;
export const selectEvents = (state) => state.users.events;

export default usersSlice.reducer;




//prodFinal

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // import dotenv from "dotenv";
// // dotenv.config();

// console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5005', // ИСПРАВИТЬ
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // const getToken = (getState) => {
// //     const { auth: { token } } = getState();
// //     return token;
// // };

// const getToken = (state) => state.auth.token;

// export const fetchUserProfile = createAsyncThunk(
//     'users/fetchUserProfile',
//     async (userId, { getState, rejectWithValue }) => {
//       const token = getToken(getState);
//       if (!token) return rejectWithValue('Token not found');
//       try {
//         console.log('Fetching user profile with token:', token); // Логирование перед запросом
//         const response = await axiosInstance.get(`/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Received user profile data:', response.data); // Логирование после получения данных
//         return response.data;
//       } catch (err) {
//         console.error('Error fetching user profile:', err.response.data); // Логирование ошибки
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

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


// export const addDog = createAsyncThunk('users/addDog', async (dogData, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     const user_id = getState().auth.user_id; 

//     if (!token) return rejectWithValue('Token not found');
//     if (!user_id) return rejectWithValue('User ID not found'); 

//     try {
//         const dataWithUserId = { ...dogData, user_id }; 
//         const response = await axiosInstance.post('/dogs', dataWithUserId, {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });




// export const fetchDogs = createAsyncThunk('users/fetchDogs', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     const user_id = getState().auth.user_id; 

//     if (!token) return rejectWithValue('Token not found');
//     if (!user_id) return rejectWithValue('User ID not found'); 

//     try {
//         const response = await axiosInstance.get(`/dogs?user_id=${user_id}`, {
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


// export const fetchUserEvents = createAsyncThunk(
//     'users/fetchUserEvents',
//     async (userId, { getState, rejectWithValue }) => {
//       const token = getToken(getState);
//       if (!token) return rejectWithValue('Token not found');
//       try {
//         const response = await axiosInstance.get(`/users/${userId}/events`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//       } catch (err) {
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );
  

// const usersSlice = createSlice({
//     name: 'users',
//     initialState: {
//         user: null,
//         dogs: [],
//         events: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserProfile.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUserProfile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload;
//             })
//             .addCase(fetchUserProfile.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(fetchUsers.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(updateUserProfile.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(updateUserProfile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload;
//             })
//             .addCase(updateUserProfile.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addDog.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(addDog.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.dogs.push(action.payload);
//             })
//             .addCase(addDog.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(fetchDogs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchDogs.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.dogs = action.payload;
//             })
//             .addCase(fetchDogs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
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
//             .addCase(fetchUserEvents.pending, (state) => {
//                 state.status = 'loading';
//               })
//               .addCase(fetchUserEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 // Предполагая, что вы хотите хранить события в state.events
//                 state.events = action.payload;
//               })
//               .addCase(fetchUserEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//               });
//     },
// });

// export const selectUserProfile = (state) => state.users;

// export default usersSlice.reducer;



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

// export const fetchDogs = createAsyncThunk('users/fetchDogs', async (_, { getState, rejectWithValue }) => {
//     const token = getToken(getState);
//     if (!token) return rejectWithValue('Token not found');
//     try {
//         const response = await axiosInstance.get("/dogs?user_id=3", {
//             headers: { 'Authorization': `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });