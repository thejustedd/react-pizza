import styles from './Search.module.scss';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../redux/store';
import { changeSearchValue } from '../../redux/filters/slice';

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => inputRef.current?.focus(), []);

  const updateSearchValue = useCallback(
    debounce((value: string) => dispatch(changeSearchValue(value)), 250),
    [],
  );

  function changeSearchField(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  function clearSearchField() {
    setValue('');
    dispatch(changeSearchValue(''));
    inputRef.current?.focus();
  }

  return (
    <>
      <div className={styles.root}>
        <svg
          className={`${styles.icon} ${styles.searchIcon}`}
          enableBackground="new 0 0 32 32"
          id="Editable-line"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="14"
            cy="14"
            fill="none"
            r="9"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="27"
            x2="20.366"
            y1="27"
            y2="20.366"
          />
        </svg>

        <input
          className={styles.input}
          type="text"
          placeholder="Поиск пиццы..."
          value={value}
          onChange={changeSearchField}
          ref={inputRef}
        />

        {!!value && (
          <svg
            className={`${styles.icon} ${styles.clearIcon}`}
            onClick={clearSearchField}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        )}
      </div>
    </>
  );
};

export { Search };
