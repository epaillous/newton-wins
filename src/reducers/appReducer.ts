import { CREATE_SUGGESTION_SUCCESS } from '../actions/suggestions';
import { RESET_MAIN_ALERT } from '../actions/alerts';

interface StateInterface {
  alertMessage: string | null;
}

const INITIAL_STATE = {alertMessage: null};

export default function appReducer(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CREATE_SUGGESTION_SUCCESS:
      return {...state, alertMessage: 'Merci pour votre suggestion !'};
    case RESET_MAIN_ALERT:
      return {...state, alertMessage: null};
    default:
      return state;
  }
}
