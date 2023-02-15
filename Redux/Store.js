import {configureStore} from '@reduxjs/toolkit';
import Videos from './Videos';

let store = configureStore({
  reducer: {
    Videos,
  },
});

export default store;
