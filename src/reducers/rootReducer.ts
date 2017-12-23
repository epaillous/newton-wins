import { combineReducers } from 'redux';
import trips from './tripsReducer';
import articles from './articlesReducer';
import navbar from './navBarReducer';
import map from './mapReducer';

const rootReducer = combineReducers({
  // short hand property names
  trips,
  articles,
  navbar,
  map
});

export default rootReducer;