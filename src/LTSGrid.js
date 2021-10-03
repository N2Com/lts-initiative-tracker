import React, { useCallback } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ArrowBack,
  ArrowForward,
  DarkMode,
  LightMode,
  Publish,
} from "@mui/icons-material";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import {
  addPlayer,
  clearPlayers,
  nextTurn,
  prevTurn,
  updateIndices,
} from "./features/initiative/initiativeSlice";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import PlayerPaper from "./PlayerPaper";
import ThemeSwitch from "./ThemeSwitch";

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
  scrollbarOverride: {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "2em",
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
  switchNegativeMargin: {
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
  },
  buttonSpacing1: { padding: theme.spacing(1), height: "100%" },
  buttonSpacing0: { padding: theme.spacing(0) },
}));

function LTSGrid(props) {
  const classes = useStyles();

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    initiative: 0,
    priority: 0,
  });

  const { players, clearPlayers, addPlayer, nextTurn, prevTurn, turnIndex } =
    props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        var reader = new FileReader();
        reader.onload = function (e) {
          var contents = e.target.result;

          const players = JSON.parse(contents).players;
          if (players?.length > 0) {
            players.forEach((p) => {
              addPlayer(p);
            });
          }
        };
        reader.readAsText(file);
      });
    },
    [addPlayer]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: ".json",
  });

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

  const sortFunction = (a, b) => {
    //  null initiative is last
    if (a.initiative == null) return 1;
    if (b.initiative == null) return -1;

    //  sort by initiative
    if (a.initiative > b.initiative) return -1;
    else if (a.initiative < b.initiative) return 1;

    //  null priority goes to bottom of equal initiatives
    if (a.priority == null || a.priority === "") return 1;
    if (b.priority == null || b.priority === "") return -1;

    if (a.priority > b.priority) return -1;
    else if (a.priority < b.priority) return 1;

    return -1;
  };

  const sortedPlayers = [...players].sort(sortFunction);

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Grid container className={classes.topGrid} columnSpacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              onClick={open}
            >
              <div style={{ height: "100%" }} {...getRootProps()}>
                <input {...getInputProps()} />
                <div>Import premade</div>
              </div>
            </Button>
          </Grid>
          <Grid item xs={4}>
              <ThemeSwitch></ThemeSwitch>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="secondary"
              onClick={clearPlayers}
              data-for="leftSide"
              data-tip="Clear the board"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        <Box flex="1" className={classes.scrollbarOverride}>
          <div style={{ height: "100%" }} {...getRootProps()}>
            <input {...getInputProps()} />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <List component="nav" style={{ flexGrow: 1 }}>
                {sortedPlayers.map((player, index) => {
                  return (
                    <Paper className={classes.paperListItem} key={player.key}>
                      <ListItem selected={index === turnIndex}>
                        <ListItemText>
                          {
                            <PlayerPaper
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
          </div>
        </Box>

        <Grid container className={classes.botGrid} columnSpacing={1}>
          <Grid item xs={4} className={classes.gridItem}>
            <TextField
              className={classes.paperListItem}
              label="Name"
              name="name"
              value={newPlayer.name}
              variant="standard"
              onChange={(e) => onChangeNewPlayer(e)}
            />
          </Grid>
          <Grid item xs={2} className={classes.gridItem}>
            <TextField
              className={classes.paperListItem}
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
          <Grid item xs={6} fullWidth style={{ height: "100%" }}>
            <Grid item container style={{ height: "100%" }} columnSpacing={1}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
