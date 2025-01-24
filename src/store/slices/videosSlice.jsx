import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//AIzaSyDLJ_erZ8Wy1ENzfGw0blvWC0QZUOd94Qc
// const urlVid = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${
//   import.meta.env.VITE_API_KEY
// }`;
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=reactjs&key=${
//   import.meta.env.VITE_API_KEY
// }`;

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_API_KEY;

// Fetch trending videos on load
export const fetchTrendingVideos = createAsyncThunk(
  "youtube/fetchTrendingVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE_URL}/videos?part=snippet,id&chart=mostPopular&regionCode=IN&maxResults=10&key=${API_KEY}`
      );

      if (!response.ok) throw new Error("Failed to fetch trending videos");
      const data = await response.json();
      console.log(data);
      const dataSnippet = data.items.map((item) => {
        return item;
      });
      console.log(dataSnippet);
      return dataSnippet;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Fetch suggestions for typeahead
export const fetchYouTubeSuggestions = createAsyncThunk(
  "youtube/fetchSuggestions",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
          searchQuery
        )}&maxResults=5&key=${API_KEY}`
      );

      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videosSlice = createSlice({
  name: "youtube",
  initialState: {
    videos: [], // Loaded videos (initial + searched)
    suggestions: [], // Suggestions for typeahead
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For trending videos
      .addCase(fetchTrendingVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchTrendingVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // For autocomplete suggestions
      .addCase(fetchYouTubeSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYouTubeSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchYouTubeSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videosSlice.reducer;
