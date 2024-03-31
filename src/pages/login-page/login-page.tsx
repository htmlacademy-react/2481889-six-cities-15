import { FormEvent, useState, useMemo, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app';
import { loginAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoutes, CITIES } from '../../constants';

function LoginPage(): JSX.Element {
  const randomCity = useMemo(() =>CITIES[Math.floor(Math.random() * CITIES.length)],[]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(()=> () => {
    setEmail('');
    setPassword('');
  },[]);
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email !== '' && password !== '') {
      dispatch(loginAction({
        login: email,
        password: password
      }));
    }
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.Main}
                className="header__logo-link header__logo-link--active"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
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
                  value={email}
                  onChange={handleInputEmail}
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
                  value={password}
                  onChange={handleInputPassword}
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
              <Link to={`/${randomCity.name}`} className="locations__item-link">
                <span>
                  {randomCity.name}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
