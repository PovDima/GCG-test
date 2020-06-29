import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import Progress from '@material-ui/core/CircularProgress';
import { FormatAlignCenter, FilterList } from '@material-ui/icons';

import * as AnalyticsActions from '../../../actions/analytics';

import './AnalyticPage.css';

class AnalyticPage extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    getDataFromAnalytic: PropTypes.func.isRequired
  };

  state = {
    page: 0,
    sort_field: 'userId',
    sort_direction: 'asc'
  };

  async componentDidMount() {
    await this.props.getDataFromAnalytic({
      page: this.state.page,
      sort_field: this.state.sort_field,
      sort_direction: this.state.sort_direction
    });
  }

  handleChangePage = async (page) => {
    await this.setState({ page: page.selected });
    await this.props.getDataFromAnalytic({
      page: this.state.page,
      sort_field: this.state.sort_field,
      sort_direction: this.state.sort_direction
    });
  };

  handleSort = (sort_field) => async (e) => {
    await this.setState({
      sort_field,
      sort_direction: this.state.sort_direction === 'asc' ? 'desc' : 'asc'
    });
    await this.props.getDataFromAnalytic({
      page: this.state.page,
      sort_field,
      sort_direction: this.state.sort_direction
    });
  };

  handleClick = () => {
    this.props.history.push('/home');
  };
  renderHeader = () => {
    const { sort_field, sort_direction } = this.state;
    return (
      <div className="headerWrapper">
        <div onClick={this.handleClick} style={{ cursor: 'pointer' }}>
          Home
        </div>
        <div className={classNames('header')} onClick={this.handleSort('userId')}>
          User ID{' '}
          {sort_field === 'userId' ? (
            <FilterList
              style={{
                transform: `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                marginLeft: '5px',
                width: '15px',
                height: '15px'
              }}
            />
          ) : (
            <FormatAlignCenter
              style={{
                marginLeft: '5px',
                width: '15px',
                height: '15px'
              }}
            />
          )}
        </div>
        <div className={classNames('header')} onClick={this.handleSort('area')}>
          Area
          {sort_field === 'area' ? (
            <FilterList
              style={{
                transform: `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                marginLeft: '5px',
                width: '15px',
                height: '15px'
              }}
            />
          ) : (
            <FormatAlignCenter
              style={{
                marginLeft: '5px',
                width: '15px',
                height: '15px'
              }}
            />
          )}
        </div>
        <div className={classNames('header', 'notActive')}>TimeStamp</div>
      </div>
    );
  };

  renderContent = () => {
    const { analytics, totalCount } = this.props;
    const { page } = this.state;

    return (
      <div className="analyticsData">
        {this.renderHeader()}
        {analytics.map((analytic) => {
          return (
            <div className="row" key={analytic._id}>
              <div className="item">{analytic.userId}</div>
              <div className="item">{analytic.area}</div>
              <div className="item">{moment(analytic.timestamp).format('HH:mm DD/MM/YYYY')}</div>
            </div>
          );
        })}
        <ReactPaginate
          pageCount={Math.ceil(totalCount / 20)}
          previousLabel={'Previous'}
          pageRangeDisplayed={3}
          nextLabel={'Next'}
          onPageChange={this.handleChangePage}
          initialPage={page}
          pageClassName={'page'}
          previousClassName={'button'}
          nextClassName={'button'}
          activeClassName={'active'}
          breakClassName={'page'}
          containerClassName="container"
          disableInitialCallback={true}
        />
      </div>
    );
  };

  render() {
    const { isLoading } = this.props;
    return <div className={'analyticPageWrapper'}>{isLoading ? <Progress size={40} /> : this.renderContent()}</div>;
  }
}

export default connect(
  (state) => {
    return {
      isLoading: state.analytics.isLoading,
      analytics: state.analytics.analytics,
      totalCount: state.analytics.totalCount
    };
  },
  { ...AnalyticsActions }
)(AnalyticPage);
