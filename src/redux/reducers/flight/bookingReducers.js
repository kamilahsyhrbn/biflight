import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passengerDetails: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPassengerDetails: (state, action) => {
      state.passengerDetails = action.payload;
    },
  },
});

export const { setPassengerDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
