import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loaders", // name of the slice is used for action type prefixes
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true; // immer library is used to update the state
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;

/**
 *
 * const showLoading = ShowLoading() // action creator
 * output -> { type: "loaders/ShowLoading" , payload:{}}
 */
