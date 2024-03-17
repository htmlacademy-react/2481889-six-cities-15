import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-page/error-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, AppRoutes} from '../../constants';
import PrivateRoute from '../private-route/private-route';


function App(): JSX.Element{
  return(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoutes.Login} element ={<LoginPage/>}/>
          <Route path={AppRoutes.Favorites} element =
            {
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
    </BrowserRouter>


  );

}
export default App;
