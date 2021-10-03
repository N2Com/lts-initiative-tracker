import React from "react";
import { Paper, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import PlayerPaper from "./PlayerPaper";

const useStyles = makeStyles((theme) => ({
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
  fullHeight: {
    height: "100%",
  },
  paperListItem: {
    margin: theme.spacing(0.5),
  },
}));

function LTSGrid(props) {
  const classes = useStyles();

  const { players, turnIndex, getRootProps, getInputProps } = props;

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
    <div
      className={`${classes.scrollbarOverride} ${classes.fullHeight}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <List component="nav" style={{ flexGrow: 1 }}>
        {sortedPlayers.map((player, index) => {
          return (
            <Paper className={classes.paperListItem} key={player.key}>
              <ListItem selected={index === turnIndex}>
                <ListItemText>
                  {<PlayerPaper index={index} player={player}></PlayerPaper>}
                </ListItemText>
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    players: state.initiative.players,
    turnIndex: state.initiative.turnIndex,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSGrid);
