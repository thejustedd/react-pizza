import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../models';
import { Pizza, PizzasState } from './types';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (paramsLine: string) => {
  const res = await axios.get<PizzasState>(`${API_URL}items?${paramsLine}`);
  return res.data;
});

export const fetchPizzaById = createAsyncThunk('pizzas/fetchPizzaById', async (id: number) => {
  const res = await axios.get<Pizza>(`${API_URL}items/${id}`);
  return res.data;
});
