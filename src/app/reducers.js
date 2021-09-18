import { combineReducers } from "redux";
import counter from "../features/counter/counterSlice";
import grid from "../features/grid/gridSlice";

export default combineReducers({
  counter,
  grid,
});
