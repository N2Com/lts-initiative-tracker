import React from "react";
import { Provider } from "react-redux";
import storeFactory from "./app/store";
import "./App.css";
import CustomThemeProvider from "./CustomThemeProvider";
import LTS from "./LTS";

function App() {
  const store = storeFactory();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <CustomThemeProvider>
          <LTS />
        </CustomThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
