import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { Provider } from "react-redux";
import store from "./redux/store";
// import "./_base.scss";

ReactDom.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App></App>
        </StateProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
