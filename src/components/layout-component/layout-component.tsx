import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app';
import { authSelectors } from '../../slices/auth';

type LayoutProps = {
  children: JSX.Element;
}

export const Layout = ({children}: LayoutProps) =>{
  const authStatus = useAppSelector(authSelectors.authorizationStatus);
  const email = useAppSelector(authSelectors.email);
  return (
    <div className='page  page--gray'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.Main} className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              {authStatus === AuthorizationStatus.Auth &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">

                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoutes.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"/>
                    <span className="header__user-name user__name">
                      {email}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link"
                    to={AppRoutes.Login}
                    onClick={() => {
                      store.dispatch(logoutAction());
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>}
              {authStatus === AuthorizationStatus.NoAuth &&
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link className="header__nav-link"
                    to={AppRoutes.Login}
                  >
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              </ul>}
            </nav>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};
