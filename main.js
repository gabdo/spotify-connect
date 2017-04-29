import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from './components/Login.jsx';
import Player from './components/Player.jsx';
import Error from './components/Error.jsx';
import Creditos from './components/Creditos.jsx';

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Login} />
         <Route path = "login" component = {Login} />
         <Route path = "error" component = {Error} />
         <Route path = "/player/:accessToken" component = {Player} />
        <Route path = "creditos" component = {Creditos} />
      </Route>
   </Router>

), document.getElementById('app'));