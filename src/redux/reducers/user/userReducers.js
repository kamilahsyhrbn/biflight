import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: [],
  isLoading: true,
};

const profileSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProfile, setIsLoading } = profileSlicer.actions;

export default profileSlicer.reducer;
