import { combineReducers } from 'redux';
import trips from './tripsReducer';
import articles from './articlesReducer';
import navbar from './navBarReducer';
import map from './mapReducer';
import header from './headerReducer';
import medias from './mediasReducer';
import suggestions from './suggestionsReducer';
import app from './appReducer';

const rootReducer = combineReducers({
  // short hand property names
  trips,
  articles,
  navbar,
  map,
  header,
  medias,
  suggestions,
  app
});

export default rootReducer;
