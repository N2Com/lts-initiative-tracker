import React, { useState } from "react";
import { Provider } from "react-redux";
import storeFactory from "./app/store";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./themes";
import "./App.css";
import LTSGrid from "./LTSGrid";

function App() {
  const store = storeFactory();

  const [theme, setTheme] = useState(false);
  const appliedTheme = createTheme(theme ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Provider store={store}>
          <LTSGrid theme={theme} toggleTheme={toggleTheme} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
