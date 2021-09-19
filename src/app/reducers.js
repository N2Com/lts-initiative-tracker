import { combineReducers } from "redux";
import counter from "../features/counter/counterSlice";
import grid from "../features/grid/gridSlice";
import initiative from "../features/initiative/initiativeSlice";

export default combineReducers({
  counter,
  grid,
  initiative,
});
