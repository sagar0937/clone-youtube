import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  searchQuery: "",
  searchSuggestions: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchSuggestions: (state, action) => {
      state.searchSuggestions = action.payload;
    },
  },
});

export const { toggleSidebar, setSearchQuery, setSearchSuggestions } =
  uiSlice.actions;
export default uiSlice.reducer;
