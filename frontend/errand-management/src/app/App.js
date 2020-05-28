import React from "react";
import { Provider } from "react-redux";
import ReactNotification from "react-notifications-component";
import "./App.css";
import "react-notifications-component/dist/theme.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import AppRoutes from "./routes";
import configureStore from "./redux/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ReactNotification />
      <AppRoutes></AppRoutes>
    </Provider>
  );
}

export default App;
