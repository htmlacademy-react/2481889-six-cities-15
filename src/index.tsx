import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const EnumerateConstants = {
  rentAmount:5
} as const;

root.render(
  <React.StrictMode>
    <App rentAmount={EnumerateConstants.rentAmount}/>
  </React.StrictMode>
);
