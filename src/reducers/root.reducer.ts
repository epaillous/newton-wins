import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-auth';
import alert from './alert.reducer';
import articles from './articles.reducer';
import header from './header.reducer';
import login from './login.reducer';
import map from './map.reducer';
import medias from './medias.reducer';
import modal from './modal.reducer';
import navbar from './navbar.reducer';
import register from './register.reducer';
import suggestions from './suggestions.reducer';
import trips from './trips.reducer';

const rootReducer = combineReducers({
  // short hand property names
  alert,
  articles,
  auth: authStateReducer,
  header,
  login,
  map,
  medias,
  modal,
  navbar,
  register,
  suggestions,
  trips,
});

export default rootReducer;
