import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app-component/App';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import { ToastContainer } from 'react-toastify';


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose = {2000}/>
      <App />
    </Provider>
  </React.StrictMode>
);
