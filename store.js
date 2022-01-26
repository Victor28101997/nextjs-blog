import { applyMiddleware, createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga, { SAGA_ACTION_SUCCESS } from "./saga";

// create your reducer
const reducer = (state = { tick: "init" }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SAGA_ACTION_SUCCESS:
      return { ...state, tick: action.data };
    case "TICK":
      console.log("tick action", action.payload);
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

// create a makeStore function
const makeStore = wrapMakeStore((context) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(
      nextReduxCookieMiddleware({ subtrees: ["tick"] }),
      sagaMiddleware
    )
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
});

export const store = createStore(reducer);
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
