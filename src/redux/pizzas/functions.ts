import { useAppSelector } from '../store';
import { selectPizzas } from './selectors';
import { Status } from './types';

export function useStatus() {
  const { status } = useAppSelector(selectPizzas);
  return {
    isLoading: status === Status.LOADING,
    isError: status === Status.ERROR,
    isSuccess: status === Status.SUCCESS,
  };
}
