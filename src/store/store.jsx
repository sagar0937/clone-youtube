import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./slices/videosSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    ui: uiReducer,
  },
});
