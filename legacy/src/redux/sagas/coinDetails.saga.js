import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getCoinDetails(action) {
  console.log("in getCoinDetails saga! Payload is:", action.payload);
  try {
    const response = yield axios.get("/api/crypto/detail");
    yield put({ type: "GET_COIN_DETAILS", payload: response.data });
    console.log("coin detail response is:", response);
  } catch (error) {
    console.log("Failure to GET COIN DETAILS crypto.saga.js", error);
  }
}

function* coinDetailsSaga() {
  yield takeEvery("FETCH_COIN_DETAILS", getCoinDetails);
}

export default coinDetailsSaga;
