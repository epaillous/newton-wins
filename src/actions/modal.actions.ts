import { Action, ActionCreator } from 'redux';

export const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModal: ActionCreator<Action> = () => {
  return {
    type: CLOSE_MODAL,
  };
};
