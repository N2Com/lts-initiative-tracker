import React, { useCallback, useState } from "react";
import { AppBar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Publish } from "@mui/icons-material";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  draggable: {
    "-webkit-app-region": "drag",
  },
  interactable: {
    "-webkit-app-region": "no-drag",
  },
}));

function CustomTitleBar(props) {
  const classes = useStyles();

  console.log(window);
  return (
    <div className={"LTS-header"}>
      <p>test?</p>
      <AppBar className={classes.draggable}>
        <Button
          className={classes.interactable}
          variant="standard"
          size="small"
        >
          Yup
        </Button>
        <Button variant="standard" size="small">
          Yip
        </Button>
        <Button
          className={classes.interactable}
          variant="standard"
          size="small"
        >
          Yop
        </Button>
      </AppBar>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    //updateIndices: (p) => dispatch(updateIndices(p)),
  };
}

function mapStateToProps(state) {
  return {
    players: state.initiative.players,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTitleBar);
