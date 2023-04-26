import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const {order, sortBy, category, currentPage} = params
  const { data } = await axios.get(
    `https://643da3786c30feced8172a1b.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}`,
  );
  return data;
});


const initialState = {
  items: [],
  status: 'loading', //loading || erorr || success
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = ('loading')
      state.items = []
    },
    
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },

    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer