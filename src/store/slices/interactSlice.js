import { createSlice } from "@reduxjs/toolkit";

const interactSlice = createSlice({
  name: "interact",
  initialState: {
    sidebar: false,
    API_KEY_YT: "2e8ac1e581msh74fa903e93d0a16p1cdb7fjsndd2e41461434",
    comments: JSON.parse(localStorage.getItem("comments")) || {},
    id: JSON.parse(localStorage.getItem("idcount")) || 1,
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
      localStorage.setItem("idcount", JSON.stringify(state.id));
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
