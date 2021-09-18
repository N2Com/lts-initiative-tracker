import { createLogic } from "redux-logic";

const logicBoii = createLogic({
  type: "*",
  process({}, dispatch, done) {
    console.log("yay");
    done();
  },
});

export default [logicBoii];
