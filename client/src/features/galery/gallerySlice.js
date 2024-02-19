// features/gallery/gallerySlice.js
import { createSlice } from '@reduxjs/toolkit';

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [
      "volunteer_image_1.jpg",
      "volunteer_image_2.jpg",
      
    ]
  },
  reducers: {
    // Del or add img 
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(image => image !== action.payload);
    }
  },
});

export const { addImage, removeImage } = gallerySlice.actions;
export default gallerySlice.reducer;
