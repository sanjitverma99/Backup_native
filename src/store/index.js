import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(createReducer(), enhancer);

store.asyncReducers = {};

export default store;
