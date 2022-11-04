import React, { FC, useState } from 'react';
import { typeNames } from '../../models';
import { Link } from 'react-router-dom';
import { Pizza } from '../../redux/pizzas/types';
import { AddButton } from '../Button/AddButton';

interface PizzaBlockProps {
  pizza: Pizza;
}

const PizzaBlock: FC<PizzaBlockProps> = ({ pizza }) => {
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(pizza.types[0]);

  return (
    <div className='pizza-block'>
      <Link to={`/pizzas/${pizza.id}`}>
        <img className='pizza-block__image' src={pizza.imageUrl} alt={pizza.title} />
      </Link>
      <h4 className='pizza-block__title'>
        <Link to={`/pizzas/${pizza.id}`}>{pizza.title}</Link>
      </h4>
      <div className='pizza-block__selector'>
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
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {pizza.price} ₽</div>
        <AddButton
          pizza={pizza}
          activeTypeIndex={activeTypeIndex}
          activeSizeIndex={activeSizeIndex}
        />
      </div>
    </div>
  );
};

export { PizzaBlock };
