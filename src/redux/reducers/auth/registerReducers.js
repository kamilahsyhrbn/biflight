import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isNameTouched: false,
  isNameValid: false,
  email: "",
  isEmailValid: false,
  phone_number: "",
  isPhoneNumberValid: false,
  password: "",
  showPassword: null,
  confirmPassword: "",
  showConfirmPassword: null,
  passwordStrength: "",
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNameTouched: (state, action) => {
      state.isNameTouched = action.payload;
    },
    setNameValid: (state, action) => {
      state.isNameValid = action.payload.length > 3;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      state.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload); // Update validasi email dengan regular expression
    },
    setPhoneNumber: (state, action) => {
      state.phone_number = action.payload;
      state.isPhoneNumberValid =
        action.payload.length >= 8 && action.payload.length <= 14; // Update validasi nomor telepon
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setPasswordStrength: (state, action) => {
      state.passwordStrength = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setShowConfirmPassword: (state, action) => {
      state.showConfirmPassword = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setName,
  setNameTouched,
  setNameValid,
  setEmail,
  setPhoneNumber,
  setPassword,
  setShowPassword,
  setPasswordStrength,
  setConfirmPassword,
  setShowConfirmPassword,
  setError,
  clearError,
} = registerSlice.actions;

export default registerSlice.reducer;
