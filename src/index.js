import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons';
import store from './redux/store';
import ErrorBoundary from './ErrorBoundary';
import useToast from './components/Toast';

React.icons = icons;

/** global popup toast */
const Toast = useToast();
const GlobalToast = () => {
  const toasters = useSelector((state) => state.app.toasters);
  return (
    <Toast.Container>
      {toasters.map((props, idx) => (
        <Toast.Item
          key={props.id}
          color={props.color}
          title={props.title}
          message={props.message}
        />
      ))}
    </Toast.Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <GlobalToast />
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
