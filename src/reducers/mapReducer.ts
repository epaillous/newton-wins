import { FETCH_TRIPS_SUCCESS } from '../actions/trips';
import { Trip } from '../models/trip';
import * as moment from 'moment';
import { SELECT_MENU_ITEM } from '../actions/menu';
import { ZOOM_ON_POINT } from '../actions/points';
import { SELECT_PLACE } from '../actions/search';
import PlaceResult = google.maps.places.PlaceResult;
import LatLng = google.maps.LatLng;

interface StateInterface {
  center: LatLng | null;
  zoom: number;
  place: PlaceResult | null;
}

const INITIAL_STATE = {
  center: null,
  zoom: 8,
  place: null
};

export default function mapReducer(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESS:
      let center = action.payload.filter((trip: Trip) => trip.date.isSameOrBefore(moment()))[0].arrival;
      return {...state, center: center.googleMapPoint, zoom: 8};
    case SELECT_MENU_ITEM:
      return {...state, center: action.payload.point.googleMapPoint, zoom: 3};
    case ZOOM_ON_POINT:
      return {...state, center: action.payload.googleMapPoint, zoom: 8};
    case SELECT_PLACE:
      let place: PlaceResult = action.payload;
      return {
        ...state, center: place.geometry.location.toJSON(), zoom: 17, place: place
      };
    default:
      return state;
  }
}
