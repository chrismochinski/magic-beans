import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

    //POST--------------
function* postPosition(action) {
    console.log('in postPosition saga!!!!'); 
    try {
        console.log('adding action.payload in postPositionSaga', action.payload);
        yield axios({
            method: 'POST',
            url: '/api/crypto/',
            data: action.payload
        });                     //FIX NOT SURE WHAT TO DO HERE YET
        yield put({ type: 'ADD_POSITION_TO_REDUX' }) //UPDATED get user stuff into redux store
    } catch (error) {                             
        console.log('error in sending new position (addToPositionSaga):', error)
    }
}

function* addToPositionSaga() {
    yield takeEvery('ADD_POSITION_TO_DB', postPosition); //UPDATED FROM COINDETAIL.JSX
}

export default addToPositionSaga;


