import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { wrapper } from "../store";

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
  const { tick } = useSelector((state) => state);
  return (
    <div>
      tick: {tick} custom: {custom}
    </div>
  );
};

// you can also use Redux `useSelector` and other hooks instead of `connect()`
export default Page;
