import { useRef, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { loginAction } from '../../store/api-actions';
import { Navigate } from 'react-router-dom';
import { authSelectors } from '../../slices/auth';
import { AppRoutes, AuthorizationStatus } from '../../constants';

function LoginPage(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector(authSelectors.authorizationStatus);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  return (
    <div className="page page--gray page--login">
      {authStatus === AuthorizationStatus.Auth && <Navigate to={AppRoutes.Main} />}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                className="header__logo-link"
              >
                <img
                  alt="6 cities logo"
                  className="header__logo"
                  height="41"
                  src="img/logo.svg"
                  width="81"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">
              Sign in
            </h1>
            <form
              action="#"
              className="login__form form"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">
                  E-mail
                </label>
                <input
                  className="login__input form__input"
                  name="email"
                  placeholder="Email"
                  required
                  type="email"
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">
                  Password
                </label>
                <input
                  className="login__input form__input"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                  ref={passwordRef}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
              >
                <span>
                  Amsterdam
                </span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
