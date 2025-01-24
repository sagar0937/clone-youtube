import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const videos = Array.from({ length: 12 }, (_, i) => ({
      id: `${page}-${i}`,
      title: `Video Title ${page}-${i}`,
      description:
        "This is a sample video description that would typically come from the YouTube API.",
      thumbnail: `https://source.unsplash.com/random/720x480?technology&sig=${page}-${i}`,
      channelTitle: `Channel ${i}`,
      channelAvatar: `https://source.unsplash.com/random/48x48?face&sig=${page}-${i}`,
      views: Math.floor(Math.random() * 1000000),
      publishedAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
    }));

    return videos;
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch videos";
      });
  },
});

export default videosSlice.reducer;
