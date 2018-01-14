import { Action, ActionCreator, Dispatch } from 'redux';
import { fetch } from 'redux-auth';
import { ThunkAction } from 'redux-thunk';
import { Suggestion, SuggestionInterface } from '../models/suggestion';
import { SuggestionType, SuggestionTypeInterface } from '../models/suggestionType';
import { ROOT_URL } from './utils';

export const FETCH_SUGGESTION_TYPES = 'FETCH_SUGGESTION_TYPES';
export const FETCH_SUGGESTION_TYPES_SUCCESS = 'FETCH_SUGGESTION_TYPES_SUCCESS';
export const FETCH_SUGGESTION_TYPES_FAILURE = 'FETCH_SUGGESTION_TYPES_FAILURE';
export const CREATE_SUGGESTION = 'CREATE_SUGGESTION';
export const CREATE_SUGGESTION_SUCCESS = 'CREATE_SUGGESTION_SUCCESS';
export const CREATE_SUGGESTION_FAILURE = 'CREATE_SUGGESTION_FAILURE';
export const UPDATE_SUGGESTION = 'UPDATE_SUGGESTION';
export const UPDATE_SUGGESTION_SUCCESS = 'UPDATE_SUGGESTION_SUCCESS';
export const UPDATE_SUGGESTION_FAILURE = 'UPDATE_SUGGESTION_FAILURE';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';
export const EDIT_SUGGESTION = 'EDIT_SUGGESTION';

const map = (suggestion: Suggestion) => {
  const suggestionHash = {
    comment: suggestion.comment,
    suggestion_type_id: suggestion.suggestionType ? suggestion.suggestionType.id : '',
  };
  if (suggestion.place) {
    return {
      ...suggestionHash,
      address: suggestion.place.formatted_address,
      name: suggestion.place.name,
      point_attributes: {
        latitude: suggestion.place.geometry.location.lat(),
        longitude: suggestion.place.geometry.location.lng(),
      }
    };
  }
  return suggestionHash;
};

interface SuggestionContainerInterface {
  suggestion: SuggestionInterface;
}

interface SuggestionTypesInterface {
  suggestion_types: SuggestionTypeInterface[];
}

interface SuggestionsInterface {
  suggestions: SuggestionInterface[];
}

export const editSuggestion: ActionCreator<Action> = (suggestion: Suggestion) => {
  return {
    payload: suggestion,
    type: EDIT_SUGGESTION,
  };
};

const tryToUpdateSuggestion: ActionCreator<Action> = () => {
  return {
    type: UPDATE_SUGGESTION,
  };
};

const updateSuggestionSuccess: ActionCreator<Action> = () => {
  return {
    type: UPDATE_SUGGESTION_SUCCESS,
  };
};

const updateSuggestionFailure: ActionCreator<Action> = () => {
  return {
    type: UPDATE_SUGGESTION_FAILURE,
  };
};


const createSuggestionSuccess: ActionCreator<Action> = () => {
  return {
    type: CREATE_SUGGESTION_SUCCESS,
  };
};

const createSuggestionFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: CREATE_SUGGESTION_FAILURE,
  };
};

const fetchSuggestionTypesSuccess: ActionCreator<Action> = (suggestionsTypes: SuggestionType[]) => {
  return {
    payload: suggestionsTypes,
    type: FETCH_SUGGESTION_TYPES_SUCCESS,
  };
};

const fetchSuggestionTypesFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_SUGGESTION_TYPES_FAILURE,
  };
};

const requestSuggestionTypes: ActionCreator<Action> = () => {
  return {
    type: FETCH_SUGGESTION_TYPES,
  };
};

const tryToCreateSuggestion: ActionCreator<Action> = () => {
  return {
    type: CREATE_SUGGESTION,
  };
};

const fetchSuggestionsSuccess: ActionCreator<Action> = (suggestions: Suggestion[]) => {
  return {
    payload: suggestions,
    type: FETCH_SUGGESTIONS_SUCCESS,
  };
};

const fetchSuggestionsFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_SUGGESTIONS_FAILURE,
  };
};

const requestSuggestions: ActionCreator<Action> = () => {
  return {
    payload: {},
    type: FETCH_SUGGESTIONS,
  };
};

export const fetchSuggestionTypes: ActionCreator<ThunkAction<Promise<void>, any, void>> = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestSuggestionTypes());
    return fetch(ROOT_URL + '/suggestion_types')
      .then((response: Response) => response.json())
      .then((json: SuggestionTypesInterface) => {
        const types = json.suggestion_types
          .map((item: SuggestionTypeInterface) => new SuggestionType(item));
        dispatch(fetchSuggestionTypesSuccess(types));
      })
      .catch((error: Error) => {
        dispatch(fetchSuggestionTypesFailure(error));
      });
  };
};

export const fetchSuggestions: ActionCreator<ThunkAction<Promise<void>, any, void>> = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestSuggestions());
    return fetch(ROOT_URL + '/suggestions')
      .then((response: Response) => response.json())
      .then((json: SuggestionsInterface) => {
        const suggestions = json.suggestions
          .map((item: SuggestionInterface) => new Suggestion(item));
        dispatch(fetchSuggestionsSuccess(suggestions));
      })
      .catch((error: Error) => {
        dispatch(fetchSuggestionsFailure(error));
      });
  };
};

export const createSuggestion: ActionCreator<ThunkAction<Promise<void>, any, void>> =
  (suggestion: Suggestion) => {
    return (dispatch: Dispatch<any>) => {
      dispatch(tryToCreateSuggestion());
      const body = map(suggestion);
      return fetch(
        ROOT_URL + '/suggestions',
        {
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }).then((response: Response) => response.json())
        .then((json: SuggestionContainerInterface) => {
          dispatch(createSuggestionSuccess());
        })
        .catch((error: Error) => {
          dispatch(createSuggestionFailure(error));
        });
    };
  }
;

export const updateSuggestion: ActionCreator<ThunkAction<Promise<void>, any, void>> =
  (suggestion: Suggestion) => {
    return (dispatch: Dispatch<any>) => {
      dispatch(tryToUpdateSuggestion());
      const body = map(suggestion);
      return fetch(
        ROOT_URL + '/suggestions/' + suggestion.id,
        {
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
        }).then((response: Response) => response.json())
        .then((json: SuggestionContainerInterface) => {
          dispatch(updateSuggestionSuccess());
        })
        .catch((error: Error) => {
          dispatch(updateSuggestionFailure(error));
        });
    };
  };
