import { Action, ActionCreator } from 'redux';

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const SHOW_SIGN_UP = 'SHOW_SIGN_UP';
export const ERROR_ON_LOGIN = 'ERROR_ON_LOGIN';
export const ERROR_ON_REGISTER = 'ERROR_ON_REGISTER';

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

export const errorOnLogin: ActionCreator<Action> = (error: any) => {
  return {
    payload: error[0],
    type: ERROR_ON_LOGIN,
  };
};

export const errorOnRegister: ActionCreator<Action> = (errors: any) => {
  return {
    payload: errors,
    type: ERROR_ON_REGISTER,
  };
};
