import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  home_filter: "Nearby",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    homeFilter: (state, action) => {
      state.home_filter = action.payload;
    },
  },
});

export const { homeFilter, setLoading } = commonSlice.actions;

export default commonSlice.reducer;
