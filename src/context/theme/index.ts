import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@/types';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: Theme.DARK,
  } as { theme: Theme },
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
