import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from "react-tooltip";
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

function LTSGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Grid container flexShrink="1" className={classes.topGrid}>
          <Grid item xs={5}>
            <Button
              className={classes.buttonSpacing0}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              //onClick={tnyPlsticDragon}
            >
              TnyPlsticDragon
            </Button>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing0}
              fullWidth
              size="small"
              variant="outlined"
              color="secondary"
              //onClick={clearTheBoard}
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
              {[].map((player, index) => {
                return (
                  <Paper className={classes.paperListItem}>
                    <ListItem selected={player.isTurn}>
                      <ListItemText>
                        {/* <D5ListItem
                          key={player.key}
                          index={index}
                          removePlayer={removePlayer}
                          functionalEdit={editPlayer}
                          player={player}
                          callbackFunction={callbackFunction}
                        ></D5ListItem> */}
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
              //value={newPlayer.name}
              //onChange={(e) => onChangeNewPlayer(e)}
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
              //value={newPlayer.initiative}
              //onChange={(e) => onChangeNewPlayer(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing1}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              //onClick={() =>
              //  addPlayer({ ...newPlayer, key: uuidv4(), isTurn: false })
              //}
            >
              <Publish></Publish>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing1}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              //onClick={() => moveTurn(false)}
            >
              <ArrowBack></ArrowBack>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSpacing1}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
              //onClick={() => moveTurn(true)}
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

export default LTSGrid;
