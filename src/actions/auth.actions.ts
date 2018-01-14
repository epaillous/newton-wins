import { Action, ActionCreator } from 'redux';

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const SHOW_SIGN_UP = 'SHOW_SIGN_UP';

export const showLogin: ActionCreator<Action> = () => {
  return {
    type: SHOW_LOGIN,
  };
};

export const showSignUp: ActionCreator<Action> = () => {
  return {
    type: SHOW_SIGN_UP,
  };
};
