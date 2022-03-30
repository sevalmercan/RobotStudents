import React from "react";
import ReactDOM from "react-dom";
import "../src/assets/styles/styles.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
