import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//TODO
function* storeDetailsInRedux() {
    console.log('in storeDetailsInRedux!'); 
    try {
        const response = yield axios.get('/api/crypto');
        console.log('response is:', response)
        yield put({ type: 'SET_SELECTED_CRYPTO', payload: response }); 
    } catch (error) {       //updated THIS TO REDUCER
        console.log('Failure to STORE ONE DETAIL in crypto.saga', error);
    }
}

//UPDATED
function* fetchCryptoList() {
    console.log('in fetchCryptoList saga!'); 
    try {
        const response = yield axios.get('/api/crypto');
        console.log('response is:', response)
        yield put({ type: 'SET_CRYPTO_LIST', payload: response.data }); 
    } catch (error) {       //updated THIS TO REDUCER
        console.log('Failure to GET in crypto.saga.js', error);
    }
}

// UPDATED Lands here from the main client page heads up:
function* fetchCryptoListSaga() {
    yield takeEvery('FETCH_CRYPTO_LIST', fetchCryptoList);
    yield takeEvery('TEMP_COIN_DETAILS', storeDetailsInRedux); //TODO
}

export default fetchCryptoListSaga;


