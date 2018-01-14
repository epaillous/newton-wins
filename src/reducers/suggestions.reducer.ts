import {
  CREATE_SUGGESTION_SUCCESS,
  EDIT_SUGGESTION,
  FETCH_SUGGESTION_TYPES_SUCCESS, FETCH_SUGGESTIONS_SUCCESS, UPDATE_SUGGESTION_SUCCESS,
} from '../actions/suggestions.actions';
import { Suggestion } from '../models/suggestion';
import { SuggestionType } from '../models/suggestionType';

interface StateInterface {
  types: SuggestionType[];
  suggestions: Suggestion[];
  suggestion: Suggestion | null;
}

const INITIAL_STATE = { types: [], suggestions: [], suggestion: null };

export default function suggestions(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_SUGGESTION_TYPES_SUCCESS:
      return { ...state, types: action.payload };
    case FETCH_SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: action.payload };
    case 'SIGN_OUT_COMPLETE':
      return { ...state, suggestions: [] };
    case EDIT_SUGGESTION:
      return { ...state, suggestion: action.payload };
    case UPDATE_SUGGESTION_SUCCESS:
    case CREATE_SUGGESTION_SUCCESS:
      return { ...state, suggestion: null };
    default:
      return state;
  }
}
