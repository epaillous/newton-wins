import { Action, ActionCreator } from 'redux';

export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR';

export const toggleNavbar: ActionCreator<Action> = () => {
  return {
    type: TOGGLE_NAVBAR,
  };
};
