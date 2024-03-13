import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import OfferPage from '../../pages/OfferPage/OfferPage';
import Error404 from '../../pages/Error404/Error404';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, routes} from '../../constants';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { offers } from '../../mocks/offers';


function App(): JSX.Element{
  return(
    <BrowserRouter>
      <Routes>
        <Route path={routes.Main}>
          <Route index element={<MainPage />} />
          <Route path={routes.Login} element ={<LoginPage/>}/>
          <Route path={routes.Favorites} element =
            {<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><FavoritesPage offers={offers}/></PrivateRoute>}
          />
          <Route path={routes.Offer} element = {<OfferPage/>}/>
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
