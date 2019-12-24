import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import store from './store';
import history from './history';
import HomePage from './components/pages/HomePage';
import AnalyticPage from './components/pages/AnalyticPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path={`/home`} component={HomePage} />
          <Route path={`/analytics`} component={AnalyticPage} />
          <Route path={`/`} render={({ location }) => {
            if (location.pathname === '/') {
              return <Redirect to="/home" />
            }
          }} />
        </Router>
      </Provider>
    )
  }
}

export default App;
