import { CLOSE_MODAL, FORM_VALID_STATUS_CHANGED } from '../actions/modal.actions';

interface StateInterface {
  closeModalNeeded: boolean;
  formValid: boolean;
}

const INITIAL_STATE = { closeModalNeeded: false, formValid: false };

export default function modal(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CLOSE_MODAL:
      return { ...state, closeModalNeeded: true };
    case FORM_VALID_STATUS_CHANGED:
      return { ...state, formValid: action.payload };
    default:
      return state;
  }
}
