import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import eventsReducer from '../features/events/eventsSlice';
import authReducer from '../features/auth/authSlice'; 
import dogsReducer from '../features/dogs/dogsSlice'; 
import galleryReducer from '../features/galery/gallerySlice';
import homeReducer from '../features/home/homeSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    events: eventsReducer,
    auth: authReducer,
    dogs: dogsReducer,
    gallery: galleryReducer,
    home: homeReducer,
  },
});

