import {
  SUCCESS_GET_DATA_FROM_ANALYTIC,
  REQUEST_GET_DATA_FROM_ANALYTIC
} from '../actions/analytics'

const initialState = {
  analytics: [],
  isLoading: false,
  totalCount: 0
};

const analyticsReducer = (state = initialState, action) => {
  const { type, analytics, totalCount } = action;

  switch (type) {
    case REQUEST_GET_DATA_FROM_ANALYTIC:
      return { ...state, isLoading: true }
    case SUCCESS_GET_DATA_FROM_ANALYTIC:
      return { ...state, analytics, totalCount, isLoading: false }
    default:
      return state
  }
}

export default analyticsReducer;
