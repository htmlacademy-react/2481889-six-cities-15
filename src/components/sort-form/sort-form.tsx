
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { Sorts } from '../../constants';
import { offersSelectors, setSort } from '../../slices/offers/offers';
import { Sort } from '../../types/sort';

const SortForm = () => {
  const [open, setOpen] = useState(false);
  const sort = useAppSelector(offersSelectors.getSort);
  const dispatch = useAppDispatch();
  function handleChangeSort(item: Sort) {
    dispatch(setSort(item));
    setOpen(false);
  }
  function handleClick() {
    setOpen(!open);
  }
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleClick}>
        {sort.name}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${open ? 'places__options--opened' : ''}`}>
        {Object.values(Sorts).map((i) => (
          <li key={i.name}
            className={`places__option ${sort === i ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleChangeSort(i)}
          >
            {i.name}
          </li>
        ))}
      </ul>
    </form>
  );
};

const MemorizedSortForm = memo(SortForm);
export default MemorizedSortForm;
