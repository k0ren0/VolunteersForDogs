import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import eventsReducer from '../features/events/eventsSlice';
import authReducer from '../features/auth/authSlice'; 
import dogsReducer from '../features/dogs/dogsSlice'; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    events: eventsReducer,
    auth: authReducer,
    dogs: dogsReducer
  },
});

