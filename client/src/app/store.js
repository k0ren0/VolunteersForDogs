import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import profileReducer from '../reducers/profileReducer';
import eventReducer from '../reducers/eventReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  event: eventReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
