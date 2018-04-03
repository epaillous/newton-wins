import PlaceResult = google.maps.places.PlaceResult;
import { Action, ActionCreator } from 'redux';

export const SELECT_PLACE = 'SELECT_PLACE';
export const SEARCH_VALUE_CHANGED = 'SEARCH_VALUE_CHANGED';

export const selectPlace: ActionCreator<Action> = (place: PlaceResult) => {
  return {
    payload: place,
    type: SELECT_PLACE,
  };
};

export const searchValueChanged: ActionCreator<Action> = (value: string) => {
  return {
    payload: value,
    type: SEARCH_VALUE_CHANGED,
  };
};
