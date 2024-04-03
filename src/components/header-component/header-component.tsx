import { Link, NavLink } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { authSelectors } from '../../slices/auth/auth';
import { memo } from 'react';
import { favoritesSelectors } from '../../slices/favorites/favorites';

const Header = () =>{
  const authStatus = useAppSelector(authSelectors.getAuthorizationStatus);
  const user = useAppSelector(authSelectors.getUser);
  const favoritesAmount = useAppSelector(favoritesSelectors.getFavoritesAmount);
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

                  <NavLink
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoutes.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={user?.avatarUrl}/>
                    </div>
                    <span className="header__user-name user__name">
                      {user?.email}
                    </span>
                    <span className="header__favorite-count">{favoritesAmount}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <button className="header__nav-link"
                    onClick={() => {
                      dispatch(logoutAction());
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </button>
                </li>
              </ul>}
              {authStatus === AuthorizationStatus.NoAuth &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile"
                    to={AppRoutes.Login}
                  >
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

const MemorizedLayout = memo(Header);
export default MemorizedLayout;
