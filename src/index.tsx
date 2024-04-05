import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-route/history-route';


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer autoClose = {2000}/>
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);
