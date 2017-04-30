import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducers';
import App from './components/App.jsx';
import Login from './components/Login';
import User from './components/User';
import Error from './components/Error';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
)(createStore)
const store = createStoreWithMiddleware(reducer)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <section>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route path="/dashboard/:accessToken/:refreshToken" component={App} />
            <Route path="/error/:errorMsg" component={Error} />
          </section>
        </HashRouter>
      </Provider>
    );
  }
}

const rootElement = document.getElementById('root');
render(<Root />, rootElement);
