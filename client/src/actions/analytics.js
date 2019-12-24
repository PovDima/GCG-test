import axios from '../axios';

export const SUCCESS_SEND_TO_ANALYTIC = 'SUCCESS_SEND_TO_ANALYTIC';
export const SUCCESS_GET_DATA_FROM_ANALYTIC = 'SUCCESS_GET_DATA_FROM_ANALYTIC';
export const REQUEST_GET_DATA_FROM_ANALYTIC = 'REQUEST_GET_DATA_FROM_ANALYTIC';

export function sendToAnalytic(data) {
  return async dispatch => {
    try {
      await axios.post('/', data);
    } catch (error) {
      console.log(error)
    }
  }
}
export function getDataFromAnalytic(params) {
  return async dispatch => {
    try {
      dispatch({
        type: REQUEST_GET_DATA_FROM_ANALYTIC,
      })

      const responce = await axios.get('/', params);

      dispatch({
        type: SUCCESS_GET_DATA_FROM_ANALYTIC,
        analytics: responce.data.analytics,
        totalCount: responce.data.totalCount
      })
    } catch (error) {
      console.log(error)
    }
  }
}
