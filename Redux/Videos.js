import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

let api_key = 'AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks';

let initialState = {
  channelProfile: {
    item: [],
    isLoading: true,
  },
};

export let getChannelsInfo = createAsyncThunk(
  'video/popular',
  async (_, thunkAPI) => {
    try {
      let data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCkB_AwGXxPAKdahxGHpeC4Q&key=${api_key}`
      );
      data = await data.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Fetch Channels Info');
    }
  }
);

let Videos = createSlice({
  name: 'Videos',
  initialState,
  extraReducers: {
    [getChannelsInfo.pending]: (state) => {
      state.channelProfile.isLoading = true;
    },
    [getChannelsInfo.fulfilled]: (state, {payload}) => {
      state.channelProfile.isLoading = false;
      state.channelProfile.item = payload;
    },
    [getChannelsInfo.rejected]: (state) => {
      state.channelProfile.isLoading = false;
    },
  },
});

export default Videos.reducer;
