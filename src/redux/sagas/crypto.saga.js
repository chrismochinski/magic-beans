import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchCryptoList() {
    console.log('in fetchCryptoList saga!'); 
    try {
        const response = yield axios.get('/api/crypto');
        console.log('full crypto list response is:', response)
        yield put({ type: 'SET_CRYPTO_LIST', payload: response.data }); 
    } catch (error) {      
        console.log('Failure to GET in crypto.saga.js', error);
    }
}

function* fetchCryptoListSaga() {
    yield takeEvery('FETCH_CRYPTO_LIST', fetchCryptoList);
}

export default fetchCryptoListSaga;


