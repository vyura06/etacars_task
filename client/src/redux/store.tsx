import { currencyReducer } from "./slices/currencySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    currencyReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;