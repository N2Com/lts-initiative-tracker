import { makeStyles } from "@mui/styles";
import { toggleDarkMode } from "./features/theme/themeSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  switchNegativeMargin: {
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
  },
}));

function ThemeSwitch(props) {
  const classes = useStyles();
  console.log(props.theme);
  return (
    <div>
      <LightMode></LightMode>
      <Switch
        className={classes.switchNegativeMargin}
        checked={props.theme.darkMode}
        onClick={props.theme.toggleTheme}
      ></Switch>
      <DarkMode></DarkMode>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDarkMode: (d) => dispatch(toggleDarkMode()),
  };
}

function mapStateToProps(state) {
  return {
    darkMode: state.theme.darkMode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);
