import { makeStyles } from "@mui/styles";
import { toggleDarkMode } from "./features/theme/themeSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { connect } from "react-redux";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  switchNegativeMargin: {
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
  },
}));

function ThemeSwitch(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <LightMode></LightMode>
      <Switch
        className={classes.switchNegativeMargin}
        checked={props.darkMode}
        onClick={props.toggleDarkMode}
      ></Switch>
      <DarkMode></DarkMode>
    </Box>
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
