/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from 'react';
import { useActionCreators, useAppSelector } from '../../hooks/use-app';
import { SORTS } from '../../constants';
import { offersAction, offersSelectors } from '../../slices/offers';
import { Sort } from '../../types/sort';

const SortForm = () => {
  const [open, setOpen] = useState(false);
  const sort = useAppSelector(offersSelectors.sort);
  const {setSort} = useActionCreators(offersAction);
  function handleChangeSort(item: Sort) {
    setSort(item);
    setOpen(false);
  }
  function handleClick() {
    setOpen(!open);
  }
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleClick}>
        {sort.name}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${open ? 'places__options--opened' : ''}`}>
        {Object.values(SORTS).map((i) => (
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

export default memo(SortForm);
