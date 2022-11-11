import axios from "axios";
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Currency} from "../../interfaces/Currency";
import { History } from "../../interfaces/History";

const api = "https://api.coincap.io/v2/assets";

interface InitialState {
  status: string;
  currencies: Currency[];
  history: History[];
}

const initialState: InitialState = {
  currencies: [],
  history: [],
  status: "loading",
};

interface Page {
  offset:number;
  limit:number;
}
export const CreatePage =(numberPage:number, elementsPerPage:number) :Page => {
  return {offset:(numberPage - 1)*elementsPerPage, limit:elementsPerPage};
}
export const getCurrencies = createAsyncThunk(
  "/currency/getCurrencies",
  async ({offset, limit}:Page) => {
    const response = await axios.get(api + `?offset=${offset}&limit=${limit}`);
    return await response.data.data;
  }
);

export const getCurrencyHistory = createAsyncThunk(
  "/currency/getCurrencyHistory",
  async (id: string | undefined) => {
    const response = await axios.get(`${api}/${id}/history?interval=d1`);
    console.log(response.data.data);
    return await response.data.data;
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCurrencies.fulfilled,
      (state, action: PayloadAction<Currency[]>) => {
        state.status = "success";
        state.currencies = action.payload;
      }
    );
    builder.addCase(getCurrencies.rejected, (state) => {
      state.status = "error";
      state.currencies = [];
    });
    builder.addCase(getCurrencies.pending, (state) => {
      state.status = "loading";
      state.currencies = [];
    });
    builder.addCase(
      getCurrencyHistory.fulfilled,
      (state, action: PayloadAction<History[]>) => {
        state.status = "success";
        state.history = action.payload;
      }
    );
    builder.addCase(getCurrencyHistory.rejected, (state) => {
      state.status = "error";
      state.history = [];
    });
    builder.addCase(getCurrencyHistory.pending, (state) => {
      state.status = "loading";
      state.history = [];
    });
  },
});

export const currencyReducer = currencySlice.reducer;
