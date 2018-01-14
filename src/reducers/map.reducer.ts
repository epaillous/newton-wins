import * as moment from 'moment';
import { SELECT_MENU_ITEM } from '../actions/menu.actions';
import { ZOOM_ON_POINT } from '../actions/points.actions';
import { SELECT_PLACE } from '../actions/search.actions';
import { FETCH_TRIPS_SUCCESS } from '../actions/trips.actions';
import { Trip } from '../models/trip';
import PlaceResult = google.maps.places.PlaceResult;
import LatLng = google.maps.LatLng;
import { CREATE_SUGGESTION_SUCCESS } from '../actions/suggestions.actions';

interface StateInterface {
  center: LatLng | null;
  place: PlaceResult | null;
  zoom: number;
}

const INITIAL_STATE = {
  center: null,
  place: null,
  zoom: 8,
};

export default function map(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESS:
      const center = action.payload
        .filter((trip: Trip) => trip.date.isSameOrBefore(moment()))[0].arrival;
      return { ...state, center: center.googleMapPoint, zoom: 8 };
    case SELECT_MENU_ITEM:
      return { ...state, center: action.payload.point.googleMapPoint, zoom: 3 };
    case ZOOM_ON_POINT:
      return { ...state, center: action.payload.googleMapPoint, zoom: 8 };
    case SELECT_PLACE:
      const place: PlaceResult = action.payload;
      return {
        ...state, center: place.geometry.location.toJSON(), place, zoom: 17,
      };
    case CREATE_SUGGESTION_SUCCESS:
      return { ...state, place: null };
    default:
      return state;
  }
}
