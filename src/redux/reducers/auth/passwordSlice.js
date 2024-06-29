import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forget: [],
  update: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setForget: (state, action) => {
      state.forget = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = action.payload;
    },
  },
});

export const { setForget, setUpdate } = passwordSlice.actions;

export default passwordSlice.reducer;
