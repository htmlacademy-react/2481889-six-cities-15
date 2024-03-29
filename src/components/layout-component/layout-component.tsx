import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { authSelectors } from '../../slices/auth';
import { memo } from 'react';

const Layout = () =>{
  const authStatus = useAppSelector(authSelectors.authorizationStatus);
  const email = useAppSelector(authSelectors.email);
  const dispatch = useAppDispatch();
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
                      dispatch(logoutAction());
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
    </div>
  );
};

const MemorizedLayout = memo(Layout);
export default MemorizedLayout;
