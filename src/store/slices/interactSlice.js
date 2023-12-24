import { createSlice } from '@reduxjs/toolkit';

const iteractSlice = createSlice({
  name: 'interact',
  initialState: {
    sidebar: false,
    API_KEY_YT : ""
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});

export const { toggleSidebar } = iteractSlice.actions;
export const selectInteract = (state) => state.interact;
export default iteractSlice.reducer;
