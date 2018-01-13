import { CLOSE_MODAL } from '../actions/modal.actions';

interface StateInterface {
  closeModalNeeded: boolean;
}

const INITIAL_STATE = { closeModalNeeded: false };

export default function modal(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CLOSE_MODAL:
      return { ...state, closeModalNeeded: true };
    default:
      return state;
  }
}
