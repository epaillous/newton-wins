import * as moment from 'moment';
import { ZOOM_CHANGED } from '../actions/map.actions';
import { SELECT_MENU_ITEM } from '../actions/menu.actions';
import { ZOOM_ON_POINT } from '../actions/points.actions';
import { SELECT_PLACE } from '../actions/search.actions';
import PlaceResult = google.maps.places.PlaceResult;
import LatLng = google.maps.LatLng;
import { CREATE_SUGGESTION_SUCCESS, RESET_SUGGESTION } from '../actions/suggestions.actions';
import { FETCH_TRIPS_SUCCESS } from '../actions/trips.actions';
import { Trip } from '../models/trip';
import LatLngBounds = google.maps.LatLngBounds;

interface StateInterface {
  center: LatLng | null;
  place: PlaceResult | null;
  zoom: number;
  viewport: LatLngBounds | null;
}

const INITIAL_STATE = {
  center: null,
  place: null,
  viewport: null,
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
        ...state, center: place.geometry.location.toJSON(), place, viewport: place.geometry.viewport,
      };
    case CREATE_SUGGESTION_SUCCESS:
    case RESET_SUGGESTION:
      return { ...state, place: null };
    case ZOOM_CHANGED:
      return { ...state, zoom: action.payload };
    default:
      return state;
  }
}
