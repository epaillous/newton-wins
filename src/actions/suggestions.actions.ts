import { fetch } from 'redux-auth';
import { ROOT_URL } from './utils';
import { SuggestionType, SuggestionTypeInterface } from '../models/suggestionType';
import { Suggestion, SuggestionInterface } from '../models/suggestion';

export const FETCH_SUGGESTION_TYPES = 'FETCH_SUGGESTION_TYPES';
export const FETCH_SUGGESTION_TYPES_SUCCESS = 'FETCH_SUGGESTION_TYPES_SUCCESS';
export const FETCH_SUGGESTION_TYPES_FAILURE = 'FETCH_SUGGESTION_TYPES_FAILURE';
export const CREATE_SUGGESTION = 'CREATE_SUGGESTION';
export const CREATE_SUGGESTION_SUCCESS = 'CREATE_SUGGESTION_SUCCESS';
export const CREATE_SUGGESTION_FAILURE = 'CREATE_SUGGESTION_FAILURE';
export const RESET_ACTIVE_SUGGESTION = 'RESET_ACTIVE_SUGGESTION';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';

function createSuggestionSuccess() {
  return {
    type: CREATE_SUGGESTION_SUCCESS,
  };
}

function resetActiveSuggestion() {
  return {
    type: RESET_ACTIVE_SUGGESTION,
  };
}

function createSuggestionFailure(error: any) {
  return {
    type: CREATE_SUGGESTION_FAILURE,
    payload: error,
  };
}

function fetchSuggestionTypesSuccess(suggestionsTypes: SuggestionType[]) {
  return {
    type: FETCH_SUGGESTION_TYPES_SUCCESS,
    payload: suggestionsTypes,
  };
}

function fetchSuggestionTypesFailure(error: any) {
  return {
    type: FETCH_SUGGESTION_TYPES_FAILURE,
    payload: error,
  };
}

function requestSuggestionTypes() {
  return {
    type: FETCH_SUGGESTION_TYPES,
    payload: {},
  };
}

function tryToCreateSuggestion() {
  return {
    type: CREATE_SUGGESTION,
    payload: {},
  };
}

function fetchSuggestionsSuccess(suggestions: Suggestion[]) {
  return {
    type: FETCH_SUGGESTIONS_SUCCESS,
    payload: suggestions,
  };
}

function fetchSuggestionsFailure(error: any) {
  return {
    type: FETCH_SUGGESTIONS_FAILURE,
    payload: error,
  };
}

function requestSuggestions() {
  return {
    type: FETCH_SUGGESTIONS,
    payload: {},
  };
}

export function fetchSuggestionTypes() {
  return (dispatch: any) => {
    dispatch(requestSuggestionTypes());
    return fetch(ROOT_URL + '/suggestion_types')
      .then((response: Response) => response.json())
      .then((json: any) => {
        const types = json.suggestion_types
          .map((item: SuggestionTypeInterface) => new SuggestionType(item));
        dispatch(fetchSuggestionTypesSuccess(types));
      })
      .catch((error: any) => {
        dispatch(fetchSuggestionTypesFailure(error));
      });
  };
}

export function fetchSuggestions() {
  return (dispatch: any) => {
    dispatch(requestSuggestions());
    return fetch(ROOT_URL + '/suggestions')
      .then((response: Response) => response.json())
      .then((json: any) => {
        const suggestions = json.suggestions
          .map((item: SuggestionInterface) => new Suggestion(item));
        dispatch(fetchSuggestionsSuccess(suggestions));
      })
      .catch((error: any) => {
        dispatch(fetchSuggestionsFailure(error));
      });
  };
}

export function createSuggestion(suggestion: Suggestion) {
  return (dispatch: any) => {
    dispatch(tryToCreateSuggestion());
    const body = {
      suggestion: {
        name: suggestion.place.name,
        address: suggestion.place.formatted_address,
        comment: suggestion.comment,
        point_attributes: {
          latitude: suggestion.place.geometry.location.lat(),
          longitude: suggestion.place.geometry.location.lng(),
        },
        suggestion_type_id: suggestion.suggestionType ? suggestion.suggestionType.id : '',
      },
    };
    return fetch(
      ROOT_URL + '/suggestions',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response: Response) => response.json())
      .then((json: any) => {
        dispatch(createSuggestionSuccess());
        dispatch(resetActiveSuggestion());
      })
      .catch((error: any) => {
        dispatch(createSuggestionFailure(error));
      });
  };
}
