import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';

import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router';
import history from './store/routerHistory';

import Page from './components/Page';

import './index.css';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" render={() => <Redirect to="/outputs-resources/networked-speaker-series"/> } />
    <Route path="/:slug" component={Page} />
  </ConnectedSwitch>
);

const App = hot(module)(connect(state => ({
  location: state.location,
}))(AppContainer));

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
