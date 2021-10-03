import React from "react";
import { Provider } from "react-redux";
import storeFactory from "./app/store";
import "./App.css";
import LTSGrid from "./LTSGrid";
import CustomThemeProvider from "./CustomThemeProvider";

function App() {
  const store = storeFactory();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <CustomThemeProvider>
          <LTSGrid />
        </CustomThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
