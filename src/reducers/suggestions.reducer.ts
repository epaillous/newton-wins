import {
  FETCH_SUGGESTION_TYPES_SUCCESS, FETCH_SUGGESTIONS_SUCCESS,
} from '../actions/suggestions.actions';
import { Suggestion } from '../models/suggestion';
import { SuggestionType } from '../models/suggestionType';

interface StateInterface {
  types: SuggestionType[];
  suggestions: Suggestion[];
}

const INITIAL_STATE = { types: [], suggestions: [] };

export default function suggestions(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_SUGGESTION_TYPES_SUCCESS:
      return { ...state, types: action.payload };
    case FETCH_SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: action.payload };
    case 'SIGN_OUT_COMPLETE': {
      return { ...state, suggestions: [] };
    }
    default:
      return state;
  }
}
