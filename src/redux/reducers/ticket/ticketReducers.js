import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticket: [],
  passenger: [],
  ticketSelected: [],
};

const ticketSlicer = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.ticket = action.payload;
    },
    setPassengers: (state, action) => {
      state.passenger = action.payload;
    },
    setTicketSelected: (state, action) => {
      state.ticketSelected = action.payload;
    },
  },
});

export const { setTicket, setPassengers, setTicketSelected } =
  ticketSlicer.actions;

export default ticketSlicer.reducer;
