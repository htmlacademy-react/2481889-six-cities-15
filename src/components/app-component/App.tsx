import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-page/error-page';
import { Route, Routes} from 'react-router-dom';
import { AppRoutes} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getToken } from '../../services/token';
import { checkAuthAction } from '../../store/api-actions';
import { useEffect } from 'react';


function App(): JSX.Element{
  const token = getToken();
  useEffect(() => {
    if (token){
      checkAuthAction();
    }
  }, [token]);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoutes.Login} element =
            {
              <PrivateRoute onlyUnAuth>
                <LoginPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.Favorites} element =
            {
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.Offer} element = {<OfferPage/>}/>
        </Route>
        <Route
          path="*"
          element={<Error404/>}
        />
      </Routes>
    </HistoryRouter>


  );

}
export default App;
