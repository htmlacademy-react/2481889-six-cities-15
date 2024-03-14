import { useAppDispatch } from '../../hooks/use-app';
import { offersAction } from '../../slices/offers';
import { City } from '../../types/city';

type CitiesListProps = {cities: City[]}

export const CitiesList = (props:CitiesListProps) => {
  const dispatch = useAppDispatch();
  return(
    props.cities.map((city) => (
      <li className="locations__item" key={city.name}>
        <a className="locations__item-link tabs__item" onClick={()=> dispatch(offersAction.setCity(city))}>
          <span>{city.name}</span>
        </a>
      </li>)));
};
