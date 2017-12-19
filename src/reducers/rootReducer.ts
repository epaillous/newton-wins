import { combineReducers } from 'redux';
import trips from './tripsReducer';

const rootReducer = combineReducers({
    // short hand property names
    trips
});

export default rootReducer;