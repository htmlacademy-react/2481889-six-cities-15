import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const rentAmount = 5;

root.render(
  <React.StrictMode>
    <App rentAmount={rentAmount}/>
  </React.StrictMode>
);
