import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* postPosition(action) {
  try {
    yield axios({
      method: "POST",
      url: "/api/crypto/",
      data: action.payload,
    });
    yield put({ type: "FETCH_USER_POSITIONS" }); //redux store
  } catch (error) {
    console.log("error in sending new position (addToPositionSaga):", error);
  }
}

function* addToPositionSaga() {
  yield takeEvery("ADD_POSITION_TO_DB", postPosition);
}

export default addToPositionSaga;
