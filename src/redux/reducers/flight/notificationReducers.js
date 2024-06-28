import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifikasi: [],
  isLoading: true,
};

const flightSlicer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifikasi: (state, action) => {
      state.notifikasi = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUpdateNotifikasi: (state, action) => {
      state.notifikasi = state.notifikasi.map((notification) =>
        notification.notification_id === action.payload.notification_id
          ? { ...notification, status: action.payload.notification_status }
          : notification
      );
    },
  },
});

export const { setNotifikasi, setIsLoading, setUpdateNotifikasi } =
  flightSlicer.actions;

export default flightSlicer.reducer;
