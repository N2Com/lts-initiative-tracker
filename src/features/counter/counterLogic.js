import { createLogic } from "redux-logic";
import { init } from "./counterSlice";

const initLogic = createLogic({
  type: [init],
  process({ getState }, dispatch, done) {
    console.log("here");
    done();
  },
});

export default [initLogic];
