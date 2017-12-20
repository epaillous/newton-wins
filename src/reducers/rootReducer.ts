import { combineReducers } from 'redux';
import trips from './tripsReducer';
import articles from './articlesReducer';

const rootReducer = combineReducers({
    // short hand property names
    trips,
    articles
});

export default rootReducer;