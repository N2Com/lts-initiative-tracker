import { createSlice } from "@reduxjs/toolkit";

export const initiativeSlice = createSlice({
  name: "initiative",
  initialState: {
    players: [],
    turnIndex: 0,
  },
  reducers: {
    nextTurn(state, action) {
      if (state.turnIndex >= state.players.length - 1) {
        console.log("End of round; going to top.");
        state.turnIndex = 0;
      } else {
        console.log(`Setting turn to ${++state.turnIndex}.`);
      }
    },
    prevTurn(state, action) {
      if (state.turnIndex <= 0) {
        console.log("Reached top; going to end.");
        state.turnIndex = state.players.length - 1;
      } else {
        console.log(`Setting turn to ${--state.turnIndex}.`);
      }
    },
    topOfRound(state, action) {
      console.log("Setting turn to 0.");
      state.turnIndex = 0;
    },
    clearPlayers(state, action) {
      console.log("Clearing all players");
      state.players = [];
    },
    removePlayer(state, action) {
      console.log("Removing player", action.payload);
      const index = state.players.findIndex((p) => p.key === action.payload);
      if (index > -1) {
        console.log("Player found", state.players[index]);
        state.players.splice(index, 1);
      } else {
        console.log("Player not found");
      }
    },
    editPlayer(state, action) {
      console.log("Editing player", action.payload);
      state.players = state.players.map((p) =>
        p.key === action.payload.key ? { ...action.payload } : p
      );
    },
    updateIndices(state, action) {
      console.log("Editing player", action.payload);
      //state.players = state.players.map((p) =>
      //  p.key === action.payload.key
      //    ? { isTurn: p.isTurn, ...action.payload }
      //    : p
      //);
    },
    addPlayer(state, action) {
      console.log("Adding player", action.payload);
      state.players.push(action.payload);
    },
  },
  extraReducers: {
    ["initiative/clearPlayers"]: (state, action) => {
      state.turnIndex = 0;
    },
  },
});

export const sortFunction = (a, b) => {
  //  null is last
  if (a.initiative === null) return 1;
  if (b.initiative === null) return -1;

  //  sort by initiative
  if (a.initiative > b.initiative) return -1;
  else if (a.initiative < b.initiative) return 1;

  //  fallback to priority
  if (a.priority > b.priority) return -1;
  else if (a.priority < b.priority) return 1;

  //  fallback to name
  return a.name.localeCompare(b.name);
};

export const {
  nextTurn,
  prevTurn,
  topOfRound,
  clearPlayers,
  removePlayer,
  editPlayer,
  updateIndices,
  addPlayer,
} = initiativeSlice.actions;

export default initiativeSlice.reducer;
