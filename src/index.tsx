import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app-component/App';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import {checkAuthAction, fetchOffersAction} from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);