//deletelater

import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* getSevenDayChart(action) {
    console.log('in getSevenDayChart saga! payload is:', action.payload);
    try {
        const response = yield axios.get(`/api/crypto/chart/${action.payload}`);
        yield put({ type: 'SEND_7_DAY_CHART_DATA', payload: response.data });
        console.log('seven day chart response is:', response.data)
    } catch (error) {
        console.log('Failure to GET 7 DAY CHART INFO crypto.saga.js', error);
    }
}

function* sevenDaySaga() {
    yield takeEvery('7_DAY_CHART', getSevenDayChart);

}

export default sevenDaySaga;


//deletelater

