import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import counterReducer, {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from "../redux/counter";
import counterSaga, { DECREMENT, INCREMENT } from "../redux/counterSaga";
import { wrapper } from "../store";
import { useInjectReducer, useInjectSaga } from "redux-injectors";

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    ({ preview }) => {
      console.log("2. Page.getStaticProps uses the store to dispatch things");
      // store.dispatch({
      //   type: "TICK",
      //   payload: "was set in other page " + preview,
      // });

      return { props: { custom: "hello custom props" } };
    }
);

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store
const DemoSagaPage = ({ custom }) => {
  // useInjectReducer({ key: "counter", reducer: counterReducer });
  // useInjectSaga({ key: "counter", saga: counterSaga });
  // const tick = useSelector((state) => state.tick);
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();

  //   const [message, setMessage] = useState(tick);
  return (
    <div className="index">
      {/* <input
        value={tick}
        onChange={(e) => {
          //   setMessage(e.target.value);
          dispatch({ type: "TICK", payload: e.target.value });
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: SAGA_ACTION });
        }}
      >
        mutate using saga action
      </button> */}
      <button
        onClick={() => {
          dispatch({ type: INCREMENT });
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          dispatch({ type: DECREMENT });
        }}
      >
        decrement
      </button>

      <pre>{JSON.stringify({ counter, custom }, null, 2)}</pre>
    </div>
  );
};

export default DemoSagaPage;
