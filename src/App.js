import React from "react";
import logo from "./logo.svg";
import Counter from "./features/counter/Counter";
import "./App.css";
import storeFactory from "./app/store";
import TOPPAGE from "./TOPPAGE";
import { Provider } from "react-redux";


function App() {
  const store = storeFactory();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <TOPPAGE />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
