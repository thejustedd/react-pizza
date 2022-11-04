export const API_URL = 'https://6290adf9665ea71fe1385b55.mockapi.io/';

export const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
export const typeNames = ['тонкое', 'традиционное'];

export enum SortProperty {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortType {
  property: SortProperty;
  order: Order;
}

export const sortMethods: SortType[] = [
  { property: SortProperty.RATING, order: Order.ASC },
  { property: SortProperty.RATING, order: Order.DESC },
  { property: SortProperty.PRICE, order: Order.ASC },
  { property: SortProperty.PRICE, order: Order.DESC },
  { property: SortProperty.TITLE, order: Order.ASC },
  { property: SortProperty.TITLE, order: Order.DESC },
];

export const sortLabel = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту',
};
