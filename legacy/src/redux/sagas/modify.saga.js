import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* modifyPosition(action) {
    console.log('in MODIFY POSITION saga with id of', action.payload); 
    try {
        yield axios({
            method: 'PUT',
            url: '/api/crypto/holdings',
            data: action.payload
        });      
        yield put({ type: 'FETCH_USER_HOLDINGS'}); //fetch from userHoldingsSaga after success
    } catch (error) {      
        console.log('Failure to MODIFY line in modify.saga.js', error);
    }
}

function* modifyPositionSaga() {
    yield takeEvery('MODIFY_POSITION', modifyPosition); //important
}

export default modifyPositionSaga;


