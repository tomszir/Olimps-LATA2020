import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
