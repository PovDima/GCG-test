import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import store from './store';
import history from './history';
import MainPage from './MainPage';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path={`/`} component={MainPage} />
        </Router>
      </Provider>
    );
  }
}

export default App;
