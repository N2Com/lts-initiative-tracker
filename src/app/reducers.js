import { combineReducers } from "redux";
import initiative from "../features/initiative/initiativeSlice";
import theme from "../features/theme/themeSlice";

export default combineReducers({
  initiative,
  theme,
});
