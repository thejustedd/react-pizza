export const API_URL = 'https://6290adf9665ea71fe1385b55.mockapi.io/';

export const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
export const typeNames = ['тонкое', 'традиционное'];

export type SortProperty = 'rating' | 'price' | 'title';
export type Order = 'asc' | 'desc';

export interface SortType {
  property: SortProperty;
  order: Order;
}

export const sortMethods: SortType[] = [
  { property: 'rating', order: 'asc' },
  { property: 'rating', order: 'desc' },
  { property: 'price', order: 'asc' },
  { property: 'price', order: 'desc' },
  { property: 'title', order: 'asc' },
  { property: 'title', order: 'desc' },
];

export const sortLabel = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту',
};
