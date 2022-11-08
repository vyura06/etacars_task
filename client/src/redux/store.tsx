import { currencyReducer } from "./slices/currencySlice";
import { configureStore } from "@reduxjs/toolkit";
import { walletReducer } from "./slices/walletSlice";

const store = configureStore({
  reducer: {
    currencyReducer,
    walletReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
