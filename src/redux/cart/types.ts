export interface ICartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartState {
  items: ICartItem[];
}
