import React from "react";
import { useSelector } from "react-redux";
import { wrapper } from "../store";
import counterSaga from "../redux/counterSaga";
import counterReducer from "../redux/counter";
import { useInjectReducer, useInjectSaga } from "redux-injectors";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    ({ req, res, ...etc }) => {
      console.log(
        "2. Page.getServerSideProps uses the store to dispatch things"
      );
      //   store.dispatch({ type: "TICK", payload: "was set in other page" });

      return { props: { custom: "what is tick" } };
    }
);

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store
const Page = ({ custom }) => {
  // useInjectReducer({ key: "counter", reducer: counterReducer });
  // useInjectSaga({ key: "counter", saga: counterSaga });
  const { counter } = useSelector((state) => state.counter);
  return (
    <div>
      counter: {counter} custom: {custom}
    </div>
  );
};

// you can also use Redux `useSelector` and other hooks instead of `connect()`
export default Page;
