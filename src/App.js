import React from "react";
import { Provider } from "react-redux";
import storeFactory from "./app/store";
import "./App.css";
import LTSGrid from "./LTSGrid";

function App() {
  const store = storeFactory();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <LTSGrid />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
