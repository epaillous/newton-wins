import { ERROR_ON_LOGIN, SHOW_LOGIN } from '../actions/auth.actions';
import { WAS_VALIDATED } from '../actions/modal.actions';

interface StateInterface {
  errorMessage: string;
}

const INITIAL_STATE = { errorMessage: '' };

export default function login(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ERROR_ON_LOGIN:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SHOW_LOGIN:
    case WAS_VALIDATED:
      return {
        ...state,
        errorMessage: ''
      };
    default:
      return state;
  }
}
