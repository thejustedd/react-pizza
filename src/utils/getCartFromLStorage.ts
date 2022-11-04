import { ICartItem } from '../redux/cart/types';

const getCartFromLStorage = (): ICartItem[] => {
  return JSON.parse(localStorage.getItem('cartItems') || '') || [];
};

export { getCartFromLStorage };
