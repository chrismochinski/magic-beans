import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//updated ...to here from below
function* fetchCryptoList() {
    console.log('in fetchCryptoList saga!'); 
    try {
        const response = yield axios.get('/api/crypto_list');
        console.log('response is:', response)
        yield put({ type: 'SET_CRYPTO_LIST', payload: response.data }); 
    } catch (error) {       //updated THIS TO REDUCER
        console.log('Failure to GET in crypto_list.saga.js', error);
    }
}

// UPDATED Lands here from the main client page heads up:
function* fetchCryptoListSaga() {
    yield takeEvery('FETCH_CRYPTO_LIST', fetchCryptoList);
}

export default fetchCryptoListSaga;


