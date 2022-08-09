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

export interface SortType {
  label: string;
  property: string;
}
export const sortMethods: SortType[] = [
  { label: 'популярности +', property: 'rating+' },
  { label: 'популярности -', property: 'rating-' },
  { label: 'цене +', property: 'price+' },
  { label: 'цене -', property: 'price-' },
  { label: 'алфавиту +', property: 'title+' },
  { label: 'алфавиту -', property: 'title-' },
];
