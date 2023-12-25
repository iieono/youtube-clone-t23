import { createSlice } from "@reduxjs/toolkit";

const interactSlice = createSlice({
  name: "interact",
  initialState: {
    sidebar: false,
    API_KEY_YT: "cb32f621a1msh531fb7dad5243e2p1e56aejsn8790531a0392",
    comments: JSON.parse(localStorage.getItem("comments")) || [],
    id: 1,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    createComment: (state, action) => {
      const newComment = { ...action.payload, id: state.id };
      if (!state.comments[action.payload.parent_id]) {
        state.comments[action.payload.parent_id] = [];
      }
      state.comments[action.payload.parent_id].push(newComment);
      state.id += 1;
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    deleteComment: (state, action) => {
      state.comments[action.payload.parent_id] = state.comments[
        action.payload.parent_id
      ].filter((item) => item.id !== action.payload.id);
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    editComment: (state, action) => {
      state.comments[action.payload.parent_id] = state.comments[
        action.payload.parent_id
      ].map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
  },
});

export const { toggleSidebar, createComment, editComment, deleteComment } =
  interactSlice.actions;
export const selectInteract = (state) => state.interact;
export default interactSlice.reducer;
