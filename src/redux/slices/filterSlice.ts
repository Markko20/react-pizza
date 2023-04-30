import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type sort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности 🠗', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers:{
    setCategoryId(state, action: PayloadAction <number>) {
      state.categoryId = action.payload
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },

    setSort(state, action: PayloadAction<sort>) {
      state.sort = action.payload
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },

  }
})

export const selectSort = (state: RootState) => state.filterSlice.sort;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer