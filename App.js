import React from "react";
import Routes from "./src/routes/index";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
