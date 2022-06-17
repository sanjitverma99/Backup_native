import { combineReducers } from "redux";
import common from "./common";
import auth from "./auth";
import questions from "./questions";
import caseworkflow from "./caseworkflow";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    common,
    questions,
    caseworkflow,
    ...asyncReducers,
  });

export default createReducer;
