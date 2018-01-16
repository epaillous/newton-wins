import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configure } from 'redux-auth';
import { ROOT_URL } from './actions/utils';
import './index.css';
import configureStore from './store/configureStore';

const store = configureStore();

function renderApp() {
  // configure redux-auth BEFORE rendering the page
  return store.dispatch(configure(
    // use the FULL PATH to your API
    { apiUrl: ROOT_URL },
    { clientOnly: true },
  )).then(() => {
    return (
      <Provider store={store} key="provider">
        <App/>
      </Provider>
    );
  });
}

const reactRoot = window.document.getElementById('root');
renderApp().then((appComponent: any) => {
  ReactDOM.render(appComponent, reactRoot);
});
