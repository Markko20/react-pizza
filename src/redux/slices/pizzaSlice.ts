import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: Record<string, string>) => {
  const {order, sortBy, category, currentPage} = params
  const { data } = await axios.get<Pizza[]>(
    `https://643da3786c30feced8172a1b.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}`,
  );

  return data as Pizza[];
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}


const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | erorr | success
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = [];
    })
  }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer