import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-auth';
import alert from './alert.reducer';
import articles from './articles.reducer';
import header from './header.reducer';
import map from './map.reducer';
import medias from './medias.reducer';
import modal from './modalWithForm.reducer';
import navbar from './navbar.reducer';
import suggestions from './suggestions.reducer';
import trips from './trips.reducer';

const rootReducer = combineReducers({
  // short hand property names
  alert,
  articles,
  auth: authStateReducer,
  header,
  map,
  medias,
  modal,
  navbar,
  suggestions,
  trips,
});

export default rootReducer;
