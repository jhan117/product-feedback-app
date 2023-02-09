import { configureStore } from "@reduxjs/toolkit";

import suggestionsSlice from "./suggestions-slice";

const store = configureStore({
  reducer: {
    suggestions: suggestionsSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
