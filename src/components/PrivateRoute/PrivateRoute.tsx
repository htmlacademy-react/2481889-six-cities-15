import {Navigate} from 'react-router-dom';
import {routes, AuthorizationStatus} from '../../constants';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={routes.Login} />
  );
}

export default PrivateRoute;
