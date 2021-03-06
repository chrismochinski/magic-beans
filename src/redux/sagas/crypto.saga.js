import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCryptoList() {
  try {
    const response = yield axios.get("/api/crypto");
    yield put({ type: "SET_CRYPTO_LIST", payload: response.data });
  } catch (error) {
    console.log("Failure to GET in crypto.saga.js", error);
  }
}

function* fetchCryptoListSaga() {
  yield takeEvery("FETCH_CRYPTO_LIST", fetchCryptoList);
}

export default fetchCryptoListSaga;
