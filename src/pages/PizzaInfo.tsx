import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentPizza } from '../redux/pizzas/selectors';
import { useStatus } from '../redux/pizzas/functions';
import { fetchPizzaById } from '../redux/pizzas/asyncActions';
import { AddButton } from '../components/Button/AddButton';

interface PizzaInfoProps {}

const PizzaInfo: FC<PizzaInfoProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pizza = useAppSelector(selectCurrentPizza);
  const { isError, isLoading, isSuccess } = useStatus();
  const navigate = useNavigate();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(fetchPizzaById(Number(id)));
  }, [id]);

  if (isSuccess && pizza) {
    return (
      <div className='container pizza-info'>
        <div className='pizza-info__image-block'>
          <img className='pizza-info__image' src={pizza.imageUrl} alt={pizza.title} />
        </div>
        <div className='pizza-info__content'>
          <h2 className='pizza-info__title'>{pizza.title}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam atque cupiditate
            deserunt ducimus, ea nobis officiis omnis porro, provident quo rem tempora veniam
            voluptatibus! Culpa cupiditate excepturi facilis harum tempora.
          </p>
          <h4 className='pizza-info__price'>{pizza.price} ₽</h4>
          <AddButton pizza={pizza} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className='container'>Загрузка...</div>;
  }

  if (isError) {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => navigate('/'), 3000);
  }

  return (
    <div className='container'>
      <h2 style={{ color: 'red' }}>Ошибка при получении пиццы</h2>
      <p>Через 3 секунды произойдет переадресация на главную страницу...</p>
    </div>
  );
};

export { PizzaInfo };
