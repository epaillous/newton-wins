import { Action, ActionCreator } from 'redux';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const WAS_VALIDATED = 'WAS_VALIDATED';
export const MODAL_ANIMATION_ENDED = 'MODAL_ANIMATION_ENDED';

export const closeModal: ActionCreator<Action> = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const formWasValidated: ActionCreator<Action> = () => {
  return {
    type: WAS_VALIDATED,
  };
};

export const modalAnimationEnded: ActionCreator<Action> = () => {
  return {
    type: MODAL_ANIMATION_ENDED,
  };
};
