import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

let api_key = 'AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks';

let initialState = {
  listVideo: [],
};

export let getPopularVideo = createAsyncThunk(
  'video/popular',
  async (_, thunkAPI) => {
    try {
      let data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=100&key=${api_key}`
      );
      data = await data.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Fetch Popular Videos');
    }
  }
);

let Videos = createSlice({
  name: 'Videos',
  initialState,
  extraReducers: {
    [getPopularVideo.fulfilled]: (state, {payload}) => {
      state.listVideo = payload;
    },
  },
});

export default Videos.reducer;
