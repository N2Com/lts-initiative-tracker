import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowBack, ArrowForward, Publish } from "@mui/icons-material";
import { connect } from "react-redux";
import {
  addPlayer,
  nextTurn,
  prevTurn,
} from "./features/initiative/initiativeSlice";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  botGrid: {
    padding: theme.spacing(1),
  },
  fullHeight: {
    height: "100%",
  },
  buttonSpacing1: { padding: theme.spacing(1), height: "100%" },
  buttonSpacing0: { padding: theme.spacing(0) },
}));

function LTSTopBar(props) {
  const classes = useStyles();

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    initiative: 0,
    priority: 0,
  });

  const { addPlayer, prevTurn, nextTurn } = props;

  const onChangeNewPlayer = (e) => {
    const { name, value, type } = e.target;

    setNewPlayer({
      ...newPlayer,
      [name]: type === "number" ? (value ? parseInt(value) : null) : value,
    });
  };

  const addNewPlayer = () => {
    addPlayer({ ...newPlayer });
    setNewPlayer({
      name: "",
      initiative: 0,
      priority: 0,
    });
  };

  return (
    <Grid container className={classes.botGrid} columnSpacing={1}>
      <Grid item xs={4}>
        <TextField
          label="Name"
          name="name"
          value={newPlayer.name}
          variant="standard"
          onChange={(e) => onChangeNewPlayer(e)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Initiative"
          name="initiative"
          type="number"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: -50, max: 50 },
            classes: { input: classes.inputStyle },
          }}
          value={newPlayer.initiative}
          onChange={(e) => onChangeNewPlayer(e)}
        />
      </Grid>

      <Grid item xs={2}>
        <Button
          fullWidth
          className={classes.buttonSpacing1}
          size="small"
          variant="contained"
          color="primary"
          onClick={addNewPlayer}
        >
          <Publish></Publish>
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          className={classes.buttonSpacing1}
          size="small"
          variant="contained"
          color="primary"
          onClick={prevTurn}
        >
          <ArrowBack></ArrowBack>
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          className={classes.buttonSpacing1}
          size="small"
          variant="contained"
          color="primary"
          onClick={nextTurn}
        >
          <ArrowForward></ArrowForward>
        </Button>
      </Grid>
    </Grid>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayer: (p) => dispatch(addPlayer(p)),
    nextTurn: () => dispatch(nextTurn()),
    prevTurn: () => dispatch(prevTurn()),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSTopBar);
