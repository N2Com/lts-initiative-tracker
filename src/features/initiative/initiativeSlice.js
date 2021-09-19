import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
      state.turnIndex = 0;
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
    addPlayer(state, action) {
      console.log("Adding player", action.payload);
      const player = { key: uuidv4(), ...action.payload };
      state.players.push(player);
    },
  },
});

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
