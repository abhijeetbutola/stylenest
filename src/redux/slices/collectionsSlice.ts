import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CollectionsState = {
    selectedCollections: string[];
}

const initialState: CollectionsState = {
    selectedCollections: []
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    toggleCollection: (state, action: PayloadAction<string>) => {
      const collection = action.payload;
      if (state.selectedCollections.includes(collection)) {
        state.selectedCollections = state.selectedCollections.filter((item) => item !== collection);
      } else {
        state.selectedCollections.push(collection);
      }
    },
    resetCollection: (state) => {
      state.selectedCollections = [];
    },
  },
});


export const { toggleCollection, resetCollection } = collectionsSlice.actions
export default collectionsSlice.reducer