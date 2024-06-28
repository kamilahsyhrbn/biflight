import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card_number: "",
  card_holder_name: "",
  isCardHolderNameTouched: false,
  isCardHolderNameValid: false,
  cvv: "",
  selectedMonth: "",
  selectedYear: "",
  isDropdownOpen: false,
  error: null,
  isLoading: false,
  paymentSuccess: false,
  showConfirmationModal: false,
  showSuccessModal: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCardNumber: (state, action) => {
      state.card_number = action.payload;
    },
    setCardHolderName: (state, action) => {
      state.card_holder_name = action.payload;
    },
    setCardHolderNameTouched: (state, action) => {
      state.isCardHolderNameTouched = action.payload;
    },
    setCardHolderNameValid: (state, action) => {
      state.isCardHolderNameValid = action.payload.length > 3;
    },
    setCvv: (state, action) => {
      state.cvv = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setIsDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPaymentSuccess: (state, action) => {
      state.paymentSuccess = action.payload;
    },
    setShowConfirmationModal: (state, action) => {
      state.showConfirmationModal = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export const {
  setCardNumber,
  setCardHolderName,
  setCardHolderNameTouched,
  setCardHolderNameValid,
  setCvv,
  setExpiryDate,
  setSelectedMonth,
  setSelectedYear,
  setIsDropdownOpen,
  setError,
  clearError,
  setLoading,
  setPaymentSuccess,
  setShowConfirmationModal,
  setShowSuccessModal,
} = paymentSlice.actions;

export default paymentSlice.reducer;
