import { Action, ActionCreator } from 'redux';

export const SHOW_MENTIONS = 'SHOW_MENTIONS';

export const showMentions: ActionCreator<Action> = () => {
  return {
    type: SHOW_MENTIONS,
  };
};
