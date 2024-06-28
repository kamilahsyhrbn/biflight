import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  pages: null,
  isLoading: true,
  choosenFlight: [],
  cheapestFlights: [],
};

const flightSlicer = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setChoosenFlight: (state, action) => {
      state.choosenFlight = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCheapestFlights: (state, action) => {
      state.cheapestFlights = action.payload;
    },
  },
});

export const {
  setFlights,
  setPages,
  setIsLoading,
  setChoosenFlight,
  setCheapestFlights,
} = flightSlicer.actions;

export default flightSlicer.reducer;
