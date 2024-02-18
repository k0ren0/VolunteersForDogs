// features/home/homeSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    title: "Welcome to Our Application!",
    introduction: "Thank you for visiting our application. We are dedicated to making a positive impact in our community.",
    sections: [
      {
        title: "Volunteering in Israel",
        content: "Volunteering in Israel is an incredible way to contribute to society and make a difference. Despite the challenges, including periods of conflict and war, volunteers play a crucial role in supporting communities in need."
      },
      {
        title: "Supporting Communities",
        content: "Whether it's providing aid to those affected by conflict, supporting local initiatives, or helping to build a brighter future for all, volunteering in Israel offers rewarding opportunities for personal growth and social impact."
      },
      {
        title: "Working with Diverse Groups",
        content: "In addition, volunteering often involves working with dogs from various populations, including those mobilized or conscripted into the army, as well as lone repatriate soldiers who have returned to Israel for military service."
      }
    ]
  },
  reducers: {
    // Reducers can be added here if needed
  },
});

export default homeSlice.reducer;
