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

export interface GetPizzas {
  items: Pizza[];
  count: number;
}

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
