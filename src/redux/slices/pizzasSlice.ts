import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../models';
import { useAppSelector } from '../store';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (paramsLine: string) => {
  const res = await axios.get<PizzasState>(`${API_URL}items?${paramsLine}`);
  return res.data;
});

export interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

type Status = 'loading' | 'success' | 'error';

export interface PizzasState {
  items: Pizza[];
  count: number;
  status: Status;
}

const initialPizzasState: PizzasState = {
  items: [],
  count: 0,
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialPizzasState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.count;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.count = 0;
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.count = 0;
      state.status = 'error';
    });
  },
});

export function useStatus() {
  const status = useAppSelector((state) => state.pizza.status);
  return {
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
  };
}

export const { setItems } = pizzasSlice.actions;
export const pizzasReducer = pizzasSlice.reducer;
