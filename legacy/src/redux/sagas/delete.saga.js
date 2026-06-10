import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteHolding(action) {
    console.log('in deleteHolding saga! action.payload is:', action.payload); 
    try {
        const response = yield axios({
            method: 'DELETE',
            url: '/api/crypto/holdings',
            data: action.payload
        });      
        yield put({ type: 'FETCH_USER_HOLDINGS'}); 
    } catch (error) {      
        console.log('Failure to DELETE line in delete.saga.js', error);
    }
}

function* deleteHoldingSaga() {
    yield takeEvery('DELETE_HOLDING', deleteHolding); //important
}

export default deleteHoldingSaga;


