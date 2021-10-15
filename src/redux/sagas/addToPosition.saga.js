import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* postPosition(action) {
    console.log('in postPosition saga!!!!'); 
    try {
        console.log('adding action.payload in postPositionSaga', action.payload);
        yield axios({
            method: 'POST',
            url: '/api/crypto/',
            data: action.payload
        });
        yield put({ type: 'NOTHING_HERE_YET_CHANGE_THIS_LATER' })
    } catch (error) {
        console.log('error in sending new position (addToPositionSaga):', error)
    }
}

function* addToPositionSaga() {
    yield takeEvery('ADD_POSITION_TO_DB', postPosition);
}

export default addToPositionSaga;


