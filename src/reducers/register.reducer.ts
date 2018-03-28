import { ERROR_ON_REGISTER, SHOW_SIGN_UP } from '../actions/auth.actions';
import { WAS_VALIDATED } from '../actions/modal.actions';

interface StateInterface {
  errors: any;
}

const INITIAL_STATE = { errors: {} };

export default function register(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ERROR_ON_REGISTER:
      return {
        ...state,
        errors: action.payload
      };
    case SHOW_SIGN_UP:
    case WAS_VALIDATED:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
}
