import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpInput: "",
  email: "",
  loading: false,
  error: null,
  timer: 120,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtpInput: (state, action) => {
      state.otpInput = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    decrementTimer: (state) => {
      state.timer -= 1;
    },
    resetTimer: (state) => {
      state.timer = 120;
    },
  },
});

export const {
  setOtpInput,
  setEmail,
  setLoading,
  setError,
  clearError,
  decrementTimer,
  resetTimer,
} = otpSlice.actions;

export default otpSlice.reducer;
