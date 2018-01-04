import { SuggestionType } from '../models/suggestionType';
import {
  FETCH_SUGGESTION_TYPES_SUCCESS,
  INIT_SUGGESTION, RESET_ACTIVE_SUGGESTION,
} from '../actions/suggestions';
import { Suggestion } from '../models/suggestion';

interface StateInterface {
  types: SuggestionType[];
  activeSuggestion: Suggestion | null;
}

const INITIAL_STATE = { types: [], activeSuggestion: new Suggestion() };

export default function suggestions(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_SUGGESTION_TYPES_SUCCESS:
      return { ...state, types: action.payload };
    case RESET_ACTIVE_SUGGESTION:
      return { ...state, activeSuggestion: null };
    case INIT_SUGGESTION:
      const suggestion = new Suggestion();
      suggestion.place = action.payload;
      return { ...state, activeSuggestion: suggestion };
    default:
      return state;
  }
}
