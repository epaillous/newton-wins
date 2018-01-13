import PlaceResult = google.maps.places.PlaceResult;
import { Action, ActionCreator } from 'redux';

export const SELECT_PLACE = 'SELECT_PLACE';

export const selectPlace: ActionCreator<Action> = (place: PlaceResult) => {
  return {
    payload: place,
    type: SELECT_PLACE,
  };
};
