import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state
interface GendersState {
  selectedGenders: string[];
}

// Define the initial state with its type
const initialState: GendersState = {
  selectedGenders: [],
};

// Create the slice with typed actions and state
const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {
    toggleGender: (state, action: PayloadAction<string>) => {
      const gender = action.payload;
      if (state.selectedGenders.includes(gender)) {
        state.selectedGenders = state.selectedGenders.filter(
          (item) => item !== gender
        );
      } else {
        state.selectedGenders.push(gender);
      }
    },
    resetGender: (state) => {
      state.selectedGenders = [];
    },
  },
});

export const { toggleGender, resetGender } = gendersSlice.actions;
export default gendersSlice.reducer;
