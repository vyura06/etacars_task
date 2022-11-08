import { Wallet } from "../../interfaces/Wallet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  currencies: Wallet[];
}

const storage = localStorage.getItem("wallet");

const initialState: InitialState = {
  currencies: storage ? JSON.parse(storage).currencies : [],
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    addCurrencyToWallet: (state, action: PayloadAction<Wallet>) => {
      const currency = state.currencies.find((e) => e.id === action.payload.id);
      if (currency) {
        const { count, price } = currency;
        const newPrice =
          (price * count + action.payload.price * action.payload.count) / 2;
        currency.price = newPrice;
        currency.count = action.payload.count + count;
      } else {
        state.currencies = [...state.currencies, action.payload];
      }
      localStorage.setItem("wallet", JSON.stringify(state));
    },
    deleteCurrencyFromWallet: (state, action: PayloadAction<string>) => {
      state.currencies = state.currencies.filter(
        (e) => e.id !== action.payload
      );
      localStorage.setItem("wallet", JSON.stringify(state));
    },
  },
});

export const walletReducer = walletSlice.reducer;
export const { addCurrencyToWallet, deleteCurrencyFromWallet } =
  walletSlice.actions;
