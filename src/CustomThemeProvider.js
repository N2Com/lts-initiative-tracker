import React from "react";
import { connect } from "react-redux";
import { darkTheme, lightTheme } from "./themes";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const CustomThemeProvider = (props) => {
  const { children } = props;

  const appliedTheme = createTheme(props.darkMode ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    darkMode: state.theme.darkMode,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomThemeProvider);
