import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import * as AnalyticsActions from '../../../actions/analytics';
import * as UsersActions from '../../../actions/users';

import { getFromLocalStorage, setToLocalStorage } from '../../../utils/localStorageUtils';

import './HomePage.css';

class HomePage extends PureComponent {
  static propTypes = {
    sendToAnalytic: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  };

  async componentDidMount() {
    const userId = getFromLocalStorage('userId');
    if (userId) {
      await this.props.setUserId(userId);
    } else {
      const generatedUserId = uuid.v4();
      setToLocalStorage('userId', generatedUserId);
    }
  }

  handleClick = async (e) => {
    const { userId, sendToAnalytic, history } = this.props;
    const area = e.target.id;
    if (area === 'Analytic') {
      history.push('/analytics');
    } else {
      await sendToAnalytic({ userId, area });
    }
  };

  renderMenu = () => {
    return (
      <div id="Menu" className="menu">
        <div id="Analytic" className="menu-item">
          Analytic
        </div>
        <div className="menu-item"> First Menu Block</div>
        <div className="menu-item"> Second Menu Block</div>
        <div className="menu-item"> Third Menu Block</div>
      </div>
    );
  };

  renderNews = () => {
    return (
      <div id="News" className="news">
        News Block
      </div>
    );
  };

  renderArticles = () => {
    return (
      <div id="Article" className="articles">
        Article Block
      </div>
    );
  };

  render() {
    return (
      <div onClick={this.handleClick} className={'homePageWrapper'}>
        {this.renderMenu()}
        <div className="main-block">
          {this.renderNews()}
          {this.renderArticles()}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { userId: state.users.userId };
  },
  { ...AnalyticsActions, ...UsersActions }
)(HomePage);
