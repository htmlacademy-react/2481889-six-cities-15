
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/use-app';
import { offersSelectors } from '../../slices/offers';
import { City } from '../../types/city';
import { Link } from 'react-router-dom';
import { memo } from 'react';

type CitiesListProps = {cities: City[]}

const CitiesList = (props: CitiesListProps) => {
  const city = useAppSelector(offersSelectors.city);

  return (
    props.cities.map((c) => (
      <li className="locations__item" key={c.name}>
        <Link
          className={classNames('locations__item-link', 'tabs__item',
            {'tabs__item--active': c.name === city.name})}
          to={`/${c.name}`}


        >
          <span>{c.name}</span>
        </Link>
      </li>)
    ));
};

const MemorizedCitesList = memo(CitiesList);
export default MemorizedCitesList;
