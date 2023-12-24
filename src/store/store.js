// store.js
import { configureStore } from '@reduxjs/toolkit';
import interactReducer from './slices/interactSlice';

const store = configureStore({
  reducer: {
    interact : interactReducer,
  },
});

export default store;
