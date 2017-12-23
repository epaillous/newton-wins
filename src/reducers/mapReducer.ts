import { FETCH_TRIPS_SUCCESS } from '../actions/trips';
import { Point } from '../models/point';
import { Trip } from '../models/trip';
import * as moment from 'moment';
import { SELECT_MENU_ITEM } from '../actions/menu';

interface StateInterface {
  center: Point;
}

const INITIAL_STATE = {center: new Point({latitude: '0', longitude: '0', id: 0, articles: []})};

export default function mapReducer(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESS:
      let center = action.payload.filter((trip: Trip) => trip.date.isSameOrBefore(moment()))[0].arrival;
      return {...state, center: center};
    case SELECT_MENU_ITEM:
      return {...state, center: action.payload.point};
    default:
      return state;
  }
}
