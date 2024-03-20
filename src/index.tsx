import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app-component/App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import {checkAuthAction, fetchOffersAction} from './store/api-actions';


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
