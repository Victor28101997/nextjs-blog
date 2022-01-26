import React from "react";
import "../styles/global.css";
import { wrapper, store } from "../store";

class MyApp extends React.Component {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
