import { Action, ActionCreator } from 'redux';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FORM_VALID_STATUS_CHANGED = 'FORM_VALID_STATUS_CHANGED';

export const closeModal: ActionCreator<Action> = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const changeFormValidStatus: ActionCreator<Action> = (newStatus: boolean) => {
  return {
    payload: newStatus,
    type: FORM_VALID_STATUS_CHANGED,
  };
};
