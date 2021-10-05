import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import icosahedron from "./icosahedron.svg";
import { AppBar } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  draggable: {
    "-webkit-app-region": "drag",
  },
  interactable: {
    "-webkit-app-region": "no-drag",
  },
  iconSpacer: {
    padding: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  },
}));

function LTSTopBar(props) {
  const classes = useStyles();

  return (
    <AppBar>
      <div className={classes.draggable}>
        <div className={`${classes.iconSpacer}`}>
          <img
            height="20px"
            src={icosahedron}
            className={`title-logo`}
            alt="logo"
          />
        </div>
      </div>
    </AppBar>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSTopBar);
