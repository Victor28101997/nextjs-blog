import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga, { SAGA_ACTION_SUCCESS } from "./saga";
import counter from "./redux/counter";

// create your reducer
const rootReducer = (state = { tick: "init" }, action) => {
  switch (action.type) {
    // case HYDRATE:
    //   return { ...state, ...action.payload };
    case SAGA_ACTION_SUCCESS:
      return { ...state, tick: action.data };
    case "TICK":
      console.log("tick action", action.payload);
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const combinedReducer = combineReducers({
  counter,
  rootReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const makeStore = () => {
  let store;

  // TODO: Add injected reducer here
  // const createReducer = (injectedReducers = {}) =>
  //   combineReducers({
  //     ...injectedReducers,
  //     rootReducer,
  //   });

  const enhancers = [
    // createInjectorsEnhancer({
    //   createReducer,
    //   runSaga: sagaMiddleware.run,
    // }),
  ];

  const isServer = typeof window === "undefined";

  if (!isServer) {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["counter"],
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, combinedReducer),
      compose(applyMiddleware(...middlewares), ...enhancers)
    );

    store.__persistor = persistStore(store);
  } else {
    store = createStore(
      combinedReducer,
      compose(applyMiddleware(...middlewares), ...enhancers)
    );
  }

  store["sagaTask"] = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
