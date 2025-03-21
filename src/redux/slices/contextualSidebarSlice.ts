import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  open: boolean;
};

const initialState: SidebarState = {
  open: false,
};

const contextualSidebarSlice = createSlice({
  name: "contextualSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { toggleSidebar, close } = contextualSidebarSlice.actions;
export default contextualSidebarSlice.reducer;
