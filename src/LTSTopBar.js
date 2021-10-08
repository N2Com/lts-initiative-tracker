import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Grid, Button } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import { clearPlayers } from "./features/initiative/initiativeSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  topGrid: {
    padding: theme.spacing(1)
  },
}));

function LTSTopBar(props) {
  const classes = useStyles();

  const { clearPlayers, getInputProps, open } = props;

  return (
    <Grid container className={classes.topGrid} columnSpacing={1}>
      <Grid item xs={6}>
        <Button
          fullWidth
          size="medium"
          variant="contained"
          color="primary"
          onClick={open}
        >
          <input {...getInputProps()} />
          <div>Import premade</div>
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
          title="Clear the board"
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    clearPlayers: () => dispatch(clearPlayers()),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LTSTopBar);
