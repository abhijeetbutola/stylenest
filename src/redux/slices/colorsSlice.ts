import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColorsState = {
  selectedColors: string[];
};

const initialState: ColorsState = {
  selectedColors: [],
};

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      if (state.selectedColors.includes(color)) {
        state.selectedColors = state.selectedColors.filter(
          (item) => item !== color
        );
      } else {
        state.selectedColors.push(color);
      }
    },
    resetColor: (state) => {
      state.selectedColors = [];
    },
  },
});

export const { toggleColor, resetColor } = colorsSlice.actions;
export default colorsSlice.reducer;
