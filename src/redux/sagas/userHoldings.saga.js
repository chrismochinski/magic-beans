import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// function* fetchUserHoldings(action) {
//     console.log('in saga to fetch user holdings! Payload is:', action.payload); 
//     try {
//         const response = yield axios.get('/api/crypto/holdings');
//         console.log('user holdings response is:', response)
//         yield put({ type: 'SET_USER_HOLDINGS', payload: response }); 
//     } catch (error) {      
//         console.log('Failure to GET user holdings', error);
//     }
// }



function* fetchUserHoldings(action) {
    console.log('in holdigns saga ROUND 2  paylooood s', action.payload); 
    try {
        console.log('adding action.payload in postPositionSaga', action.payload);
        const holdings = yield axios({
            method: 'GET',
            url: '/api/crypto/holdings',
            data: action.payload
        });                  
        console.log('full user holdings repsonse is:', holdings.data)
        yield put({ type: 'SET_USER_HOLDINGS', payload: holdings.data}); 
    } catch (error) {                             
        console.log('error GETTING UER HOLDINGZZZZ:', error)
    }
}




function* fetchUserHoldingsSaga() {
    yield takeEvery('FETCH_USER_HOLDINGS', fetchUserHoldings);
}

export default fetchUserHoldingsSaga;


