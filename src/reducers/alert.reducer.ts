import { RESET_MAIN_ALERT } from '../actions/alerts.actions';
import { CREATE_SUGGESTION_SUCCESS, DELETE_SUGGESTION_SUCCESS, UPDATE_SUGGESTION_SUCCESS } from '../actions/suggestions.actions';

interface StateInterface {
  alertMessage: string | null;
}

const INITIAL_STATE = { alertMessage: null };

export default function alert(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CREATE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Merci pour votre suggestion !' };
    case UPDATE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Votre modification a bien été prise en compte !' };
    case DELETE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Votre suggestion a bien été supprimée' };
    case RESET_MAIN_ALERT:
      return { ...state, alertMessage: null };
    case 'EMAIL_SIGN_IN_COMPLETE':
    case 'EMAIL_SIGN_UP_COMPLETE':
    case 'OAUTH_SIGN_IN_COMPLETE':
      return { ...state, alertMessage: 'Connexion réussie !' };
    case 'SIGN_OUT_COMPLETE':
      return { ...state, alertMessage: 'Vous n\'êtes plus connecté(e)' };
    default:
      return state;
  }
}
