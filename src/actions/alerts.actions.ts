import { Action, ActionCreator } from 'redux';

export const RESET_MAIN_ALERT = 'RESET_MAIN_ALERT';

export const resetMainAlert: ActionCreator<Action> = () => {
  return {
    type: RESET_MAIN_ALERT,
  };
};
