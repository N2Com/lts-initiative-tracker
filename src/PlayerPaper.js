import React, { useState } from "react";
import { TextField, Grid, Box, IconButton, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";
import {
  editPlayer,
  removePlayer,
} from "./features/initiative/initiativeSlice";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      display: "none",
    },
  },
  gridItem: {
    flexGrow: 1,
  },
  deleteButton: {
    position: "absolute !important",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    zIndex: 999,
  },
}));

function PlayerPaper(props) {
  const classes = useStyles();
  const { player, removePlayer } = props;

  const [_player, setPlayer] = useState({
    key: player.key,
    name: player.name,
    priority: player.priority,
    initiative: player.initiative,
  });

  const editPlayer = (e) => {
    const { name, value, type } = e.target;

    setPlayer({
      ..._player,
      [name]: type === "number" ? (value ? parseInt(value) : "") : value,
    });
  };

  const updatePlayerInState = () => {
    if (
      player.name !== _player.name ||
      player.initiative !== _player.initiative ||
      player.priority !== _player.priority
    )
      props.editPlayer(_player);
  };

  return (
    <div>
      <IconButton
        onClick={() => removePlayer(_player.key)}
        tabIndex={-1}
        className={classes.deleteButton}
        title="Remove Player"
      >
        <Delete />
      </IconButton>
      <Grid
        container
        style={{ position: "relative" }}
        direction="row"
        spacing={2}
      >
        <Grid item xs={5} className={classes.gridItem}>
          <TextField
            label="Name"
            name="name"
            variant="standard"
            value={_player.name || ""}
            onChange={(e) => editPlayer(e)}
            onBlur={(e) => updatePlayerInState(e)}
          />
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <TextField
            label="Initiative"
            name="initiative"
            type="number"
            variant="standard"
            InputProps={{
              classes: { input: classes.inputStyle },
            }}
            value={_player.initiative?.toString() || ""}
            onChange={(e) => editPlayer(e)}
            onBlur={(e) => updatePlayerInState(e)}
          />
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <TextField
            label="Priority"
            name="priority"
            type="number"
            variant="standard"
            InputProps={{
              classes: { input: classes.inputStyle },
            }}
            value={_player.priority?.toString() || ""}
            onChange={(e) => editPlayer(e)}
            onBlur={(e) => updatePlayerInState(e)}
          />
        </Grid>
        <Grid item xs={1} className={classes.gridItem}>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            minHeight="100%"
          ></Box>
        </Grid>
      </Grid>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    editPlayer: (p) => dispatch(editPlayer(p)),
    removePlayer: (key) => dispatch(removePlayer(key)),
  };
}

function mapStateToProps(state) {
  return {
    players: state.initiative.players,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPaper);
