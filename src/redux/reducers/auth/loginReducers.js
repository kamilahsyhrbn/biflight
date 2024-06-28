import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isEmailValid: false,
  password: "",
  showPassword: false,
  isPasswordTouched: false,
  token: null,
  user: null,
  error: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      state.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload); // Update validasi email dengan regular expression
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setPasswordTouched: (state, action) => {
      state.isPasswordTouched = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordTouched,
  setToken,
  setUser,
  setError,
  clearError,
  setIsLoggedIn,
} = loginSlice.actions;

export default loginSlice.reducer;
