import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  isLoading: true,
  isPrintLoading: true,
  recentSearch: [],
};

const transactionSlicer = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsPrintLoading: (state, action) => {
      state.isPrintLoading = action.payload;
    },
    addToRecentSearch: (state, action) => {
      state.recentSearch = [...state.recentSearch, action.payload];
    },
    removeAllFromRecentSearch: (state, action) => {
      state.recentSearch = state.recentSearch.filter(
        (search) => search.email !== action.payload
      );
    },
    removeFromRecentSearch: (state, action) => {
      state.recentSearch = state.recentSearch.filter(
        (search, index) => index !== action.payload
      );
    },
  },
});

export const {
  setTransactions,
  setIsLoading,
  addToRecentSearch,
  removeAllFromRecentSearch,
  removeFromRecentSearch,
  setIsPrintLoading,
} = transactionSlicer.actions;

export default transactionSlicer.reducer;
