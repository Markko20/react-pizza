import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterSlice,
    cart,
    pizza
  }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispacth = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispacth>()