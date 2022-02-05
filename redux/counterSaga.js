import { delay, put, takeEvery } from "redux-saga/effects";
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./counter";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

function* handleIncrement() {
  console.log("increment..........");
  yield delay(100);
  yield put({
    type: INCREMENT_COUNTER,
  });
}

function* handleDecrement() {
  yield delay(100);
  yield put({
    type: DECREMENT_COUNTER,
  });
}

function* counterSaga() {
  yield takeEvery(INCREMENT, handleIncrement);
  yield takeEvery(DECREMENT, handleDecrement);
}

export default counterSaga;
