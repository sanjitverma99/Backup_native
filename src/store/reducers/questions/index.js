import { combineReducers } from 'redux';
import questions from './questions.reducer';

const questionReducers = combineReducers({
  questions,
});

export default questionReducers;
