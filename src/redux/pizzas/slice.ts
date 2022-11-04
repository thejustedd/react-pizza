import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzasState, Status } from './types';
import { fetchPizzaById, fetchPizzas } from './asyncActions';

const initialPizzasState: PizzasState = {
  items: [],
  count: 0,
  status: Status.LOADING,
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
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.count = 0;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.count = 0;
      state.status = Status.ERROR;
    });
    builder.addCase(fetchPizzaById.fulfilled, (state, action) => {
      state.currentPizza = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzaById.pending, (state) => {
      state.currentPizza = undefined;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzaById.rejected, (state) => {
      state.currentPizza = undefined;
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export const pizzasReducer = pizzasSlice.reducer;
