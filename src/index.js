import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './containers/app';

import 'sanitize.css/sanitize.css';
import './index.css';

const target = document.querySelector('#application');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <div className="flyout">
            <App />
        </div>
    </ConnectedRouter>
  </Provider>,
  target
);

