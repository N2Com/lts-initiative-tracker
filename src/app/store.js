import { configureStore, unwrapResult } from "@reduxjs/toolkit";
import { createLogicMiddleware } from "redux-logic";
import rootReducer from "./reducers";
import rootLogic from "./logic";

export const createStore = (reducer, logic) => {
  const logicDeps = {
    dispatchAsync: (action) => store.dispatch(action).then(unwrapResult),
  };
  const logicMiddleware = createLogicMiddleware(logic, logicDeps);

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }).concat(logicMiddleware),
  });

  return store;
};

let store = createStore(rootReducer, rootLogic);

const returnStore = () => store;
export default returnStore;
