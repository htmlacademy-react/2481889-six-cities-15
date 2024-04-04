import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import Layout from '../../components/header-component/header-component';
import { useAppSelector } from '../../hooks/use-app';
import { favoritesSelectors } from '../../slices/favorites/favorites';
import FavoritesCity from './favorites-city/favorites-city';
import NoFavorites from './no-favorites/no-favorites';
import Spinner from '../../components/spinner/spinner';

export const FavoritesPage = () => {
  const favoritesAmount = useAppSelector(favoritesSelectors.getFavoritesAmount);
  const isFavoritesDataLoading = useAppSelector(favoritesSelectors.getIsFavoritesDataLoading);
  return(

    <div className={`page ${!isFavoritesDataLoading && 'page--favorites-empty'}`}>
      <Layout/>
      {isFavoritesDataLoading && <Spinner/>}
      {!isFavoritesDataLoading && favoritesAmount === 0 && <NoFavorites/>}
      {!isFavoritesDataLoading && favoritesAmount !== 0 && <FavoritesCity/>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoutes.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>

    </div>

  );
};
export default FavoritesPage;
