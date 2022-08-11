import React, { FC, useState } from 'react';
import { Pizza, typeNames } from '../../models';
import { RootState, useAppDispatch } from '../../redux/store';
import { addCartItem } from '../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';

interface PizzaBlockProps {
  pizza: Pizza;
}

const PizzaBlock: FC<PizzaBlockProps> = ({ pizza }) => {
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(pizza.types[0]);
  const dispatch = useAppDispatch();
  const cartItem = useSelector(
    (state: RootState) => state.cart.items.find((item) => item.id === pizza.id)!,
  );
  const addedCount = cartItem ? cartItem.count : 0;

  function addToCart() {
    const item = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeTypeIndex],
      size: pizza.sizes[activeSizeIndex],
    };
    dispatch(addCartItem(item));
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt={pizza.title} />
      <h4 className="pizza-block__title">{pizza.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {pizza.types.map((typeIndex) => (
            <li
              key={typeIndex}
              className={activeTypeIndex === typeIndex ? 'active' : ''}
              onClick={() => setActiveTypeIndex(typeIndex)}>
              {typeNames[typeIndex]}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size, index) => (
            <li
              key={index}
              className={index === activeSizeIndex ? 'active' : ''}
              onClick={() => setActiveSizeIndex(index)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button className="button button--outline button--add" onClick={addToCart}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export { PizzaBlock };
