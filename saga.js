import { all, delay, put, takeEvery } from "redux-saga/effects";
import counterSaga from "./redux/counterSaga";

export const SAGA_ACTION = "SAGA_ACTION";
export const SAGA_ACTION_SUCCESS = `${SAGA_ACTION}_SUCCESS`;

function* sagaAction() {
  yield delay(100);
  yield put({
    type: SAGA_ACTION_SUCCESS,
    data: "saga action message",
  });
}

function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootSaga;
