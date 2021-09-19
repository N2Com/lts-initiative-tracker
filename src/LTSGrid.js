import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { ArrowBack, ArrowForward, Publish } from "@material-ui/icons";
import {
  Grid,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core/";
import {
  addPlayer,
  clearPlayers,
  nextTurn,
  prevTurn,
  updateIndices,
} from "./features/initiative/initiativeSlice";
import { useState } from "react";
import PlayerPaper from "./PlayerPaper";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      display: "none",
    },
  },
  clearAllButton: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0),
  },
  terms: {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "3em",
    },
    "&::-webkit-scrollbar-track": {
      border: "2px grey solid",
      borderRadius: "30px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "30px",
      height: "100px",
    },
  },
  topGrid: {
    padding: theme.spacing(1),
  },
  botGrid: {
    padding: theme.spacing(1),
  },
  paperListItem: {
    margin: theme.spacing(0.5),
  },
  buttonSpacing1: { padding: theme.spacing(2) },
  buttonSpacing0: { padding: theme.spacing(0) },
}));

function LTSGrid(props) {
  const classes = useStyles();

  const [newPlayer, setNewPlayer] = useState({
    name: "New Player",
    initiative: null,
  });

  const onChangeNewPlayer = (e) => {
    const { name, value, type } = e.target;
    console.log("New player", e);

    setNewPlayer({
      ...newPlayer,
      [name]: type === "number" ? (value ? parseInt(value) : null) : value,
    });
  };

  const addNewPlayer = () => {
    addPlayer({ ...newPlayer, key: uuidv4(), isTurn: false });
    setNewPlayer({
      name: "",
      initiative: 0,
    });
  };

  const { players, clearPlayers, addPlayer, nextTurn, prevTurn, turnIndex } =
    props;

  const sortFunction = (a, b) => {
    //  null is last
    if (a.initiative === null) return 1;
    if (b.initiative === null) return -1;

    //  sort by initiative
    if (a.initiative > b.initiative) return -1;
    else if (a.initiative < b.initiative) return 1;

    if (a.priority && b.priority) {
      //  fallback to priority
      if (a.priority > b.priority) return -1;
      else if (a.priority < b.priority) return 1;
    }

    //  fallback to name
    return -1;
  };

  const sortedPlayers = [...players].sort(sortFunction);

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Grid container flexShrink="1" className={classes.topGrid}>
          <Grid item xs={5}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing0}
              fullWidth
              size="small"
              variant="outlined"
              color="secondary"
              onClick={clearPlayers}
              data-for="leftSide"
              data-tip="Clear the board"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        <Box flex="1" className={classes.terms}>
          <Grid container direction="row" justify="center" alignItems="center">
            <List component="nav" style={{ flexGrow: 1 }}>
              {sortedPlayers.map((player, index) => {
                return (
                  <Paper className={classes.paperListItem}>
                    <ListItem selected={index === turnIndex}>
                      <ListItemText>
                        {
                          <PlayerPaper
                            key={player.key}
                            index={index}
                            player={player}
                          ></PlayerPaper>
                        }
                      </ListItemText>
                    </ListItem>
                  </Paper>
                );
              })}
            </List>
          </Grid>
        </Box>

        <Grid container className={classes.botGrid}>
          <Grid item xs={4} className={classes.gridItem}>
            <TextField
              className={classes.paperListItem}
              label="Name"
              name="name"
              value={newPlayer.name}
              onChange={(e) => onChangeNewPlayer(e)}
            />
          </Grid>
          <Grid item xs={2} className={classes.gridItem}>
            <TextField
              className={classes.paperListItem}
              label="Initiative"
              name="initiative"
              type="number"
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
              className={classes.buttonSpacing1}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              onClick={addNewPlayer}
            >
              <Publish></Publish>
            </Button>
          </Grid>
          <Grid item xs={2}>
            {
              <Button
                className={classes.buttonSpacing1}
                fullWidth
                size="small"
                variant="outlined"
                color="primary"
                onClick={prevTurn}
              >
                <ArrowBack></ArrowBack>
              </Button>
            }
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing1}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              onClick={nextTurn}
            >
              <ArrowForward></ArrowForward>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <ReactTooltip id="leftSide" place="left" effect="solid" />
      <ReactTooltip id="rightSide" place="right" effect="solid" />
      <ReactTooltip id="botSide" place="bottom" effect="solid" />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateIndices: (p) => dispatch(updateIndices(p)),
    clearPlayers: () => dispatch(clearPlayers()),
    addPlayer: (p) => dispatch(addPlayer(p)),
    nextTurn: () => dispatch(nextTurn()),
    prevTurn: () => dispatch(prevTurn()),
  };
}

function mapStateToProps(state) {
  return {
    players: state.initiative.players,
    turnIndex: state.initiative.turnIndex,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSGrid);