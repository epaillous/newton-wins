import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/app.container';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import { verifyCredentials } from './actions/users.actions';

const store = configureStore();
verifyCredentials(store);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
