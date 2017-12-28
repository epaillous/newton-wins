import { combineReducers } from 'redux';
import trips from './tripsReducer';
import articles from './articlesReducer';
import navbar from './navBarReducer';
import map from './mapReducer';
import header from './headerReducer';
import medias from './mediasReducer';

const rootReducer = combineReducers({
  // short hand property names
  trips,
  articles,
  navbar,
  map,
  header,
  medias
});

export default rootReducer;