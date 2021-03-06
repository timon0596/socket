import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { stores } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
