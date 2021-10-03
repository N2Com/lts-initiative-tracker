import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import icosahedron from "./icosahedron.svg";

const useStyles = makeStyles((theme) => ({
  draggable: {
    "-webkit-app-region": "drag",
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  interactable: {
    "-webkit-app-region": "no-drag",
  },
}));

function LTSTopBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.draggable}>
      <img height="20px" src={icosahedron} className="title-logo" alt="logo" />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSTopBar);
