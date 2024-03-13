import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { Sorts } from '../../constants';
import { setSort } from '../../actions/action';

export const SortForm = () => {
  const [open, setOpen] = useState(false);
  const sort = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();
  function handleChangeSort(item: string) {
    dispatch(setSort(item));
    setOpen(false);
  }
  function handleClick() {
    setOpen(!open);
  }
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleClick}>
        {sort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${open ? 'places__options--opened' : ''}`}>
        {Object.values(Sorts).map((i) => (
          <li key={i}
            className={`places__option ${sort === i ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleChangeSort(i)}
          >
            {i}
          </li>
        ))}
      </ul>
    </form>
  );
};
