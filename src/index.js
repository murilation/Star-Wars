import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Lista from './pages/list/appList';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/main.scss';
import './fonts/stylesheet.css';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path='/' component={Lista}></Route>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
);
