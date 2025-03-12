import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RatingsState = {
  selectedRatings: number[];
};

const initialState: RatingsState = {
  selectedRatings: [],
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    toggleRating: (state, action: PayloadAction<number>) => {
      const rating = action.payload;
      if (state.selectedRatings.includes(rating)) {
        state.selectedRatings = state.selectedRatings.filter(
          (item) => item !== rating
        );
      } else {
        state.selectedRatings.push(rating);
      }
    },
    resetRating: (state) => {
      state.selectedRatings = [];
    },
  },
});

export const { toggleRating, resetRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
