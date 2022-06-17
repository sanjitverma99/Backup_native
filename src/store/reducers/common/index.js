import { combineReducers } from 'redux';
import settings from './settings.reducer';
import backdrop from './backdrop.reducer';

const commonReducers = combineReducers({
  settings,
  backdrop,
});

export default commonReducers;
