import wretch from 'wretch';
import { ROOT_URL } from './utils';
import { SuggestionType, SuggestionTypeInterface } from '../models/suggestionType';
import { Suggestion } from '../models/suggestion';

export const FETCH_SUGGESTION_TYPES = 'FETCH_SUGGESTION_TYPES';
export const FETCH_SUGGESTION_TYPES_SUCCESS = 'FETCH_SUGGESTION_TYPES_SUCCESS';
export const FETCH_SUGGESTION_TYPES_FAILURE = 'FETCH_SUGGESTION_TYPES_FAILURE';
export const CREATE_SUGGESTION = 'CREATE_SUGGESTION';
export const CREATE_SUGGESTION_SUCCESS = 'CREATE_SUGGESTION_SUCCESS';
export const CREATE_SUGGESTION_FAILURE = 'CREATE_SUGGESTION_FAILURE';
export const RESET_ACTIVE_SUGGESTION = 'RESET_ACTIVE_SUGGESTION';
export const INIT_SUGGESTION = 'INIT_SUGGESTION';

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

export function fetchSuggestionTypes() {
  return (dispatch: any) => {
    dispatch(requestSuggestionTypes());
    return wretch(ROOT_URL + '/suggestion_types').get()
      .json((json: any) => {
        const types = json.suggestion_types
          .map((item: SuggestionTypeInterface) => new SuggestionType(item));
        dispatch(fetchSuggestionTypesSuccess(types));
      })
      .catch((error: any) => {
        dispatch(fetchSuggestionTypesFailure(error));
      });
  };
}

export function createSuggestion(suggestion: Suggestion) {
  return (dispatch: any) => {
    dispatch(tryToCreateSuggestion());
    return wretch(ROOT_URL + '/suggestions').json({
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
    })
      .post()
      .json((json: any) => {
        dispatch(createSuggestionSuccess());
        dispatch(resetActiveSuggestion());
      })
      .catch((error: any) => {
        dispatch(createSuggestionFailure(error));
      });
  };
}
