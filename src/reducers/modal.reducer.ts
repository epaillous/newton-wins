import { SHOW_LOGIN, SHOW_SIGN_UP } from '../actions/auth.actions';
import { SHOW_MENTIONS } from '../actions/mentions.actions';
import { CLOSE_MODAL, WAS_VALIDATED } from '../actions/modal.actions';
import { CREATE_SUGGESTION_SUCCESS, EDIT_SUGGESTION, NEW_SUGGESTION, UPDATE_SUGGESTION_SUCCESS } from '../actions/suggestions.actions';

interface StateInterface {
  modalOpened: boolean;
  wasValidated: boolean;
}

const INITIAL_STATE = { modalOpened: false, wasValidated: false };

export default function modal(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CLOSE_MODAL:
    case UPDATE_SUGGESTION_SUCCESS:
    case CREATE_SUGGESTION_SUCCESS:
    case 'EMAIL_SIGN_UP_COMPLETE':
      return { ...state, modalOpened: false, wasValidated: false };
    case EDIT_SUGGESTION:
    case NEW_SUGGESTION:
    case SHOW_LOGIN:
    case SHOW_SIGN_UP:
    case SHOW_MENTIONS:
      return { ...state, modalOpened: true, wasValidated: false };
    case WAS_VALIDATED:
      return { ...state, wasValidated: true };
    default:
      return state;
  }
}
