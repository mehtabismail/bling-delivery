import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  home_filter: 'Nearby',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    homeFilter: (state, action) => {
      state.home_filter = action.payload;
    },
  },
});

export const {homeFilter} = commonSlice.actions;

export default commonSlice.reducer;
