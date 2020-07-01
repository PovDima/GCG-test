import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as UsersActions from '../actions/modeling';

import './MainPage.css';

class MainPage extends PureComponent {
  render() {
    return <div className={'homePageWrapper'}>123</div>;
  }
}

export default connect(
  (state) => {
    return { userId: state.modeling.userId };
  },
  { ...UsersActions }
)(MainPage);
