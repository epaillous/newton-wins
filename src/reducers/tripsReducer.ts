import { FETCH_TRIPS, FETCH_TRIPS_SUCCESS } from '../actions/trips';
import { Trip } from '../models/trip';

interface TripsStateInterface {
  trips: Trip[];
  loading: boolean;
  error: any;
}

interface StateInterface {
  tripsList: TripsStateInterface;
}

const INITIAL_STATE = { tripsList: {trips: [], error: null, loading: false} };

export default function tripsReducer(state: StateInterface = INITIAL_STATE, action: any)  {
    switch (action.type) {
      case FETCH_TRIPS:
        return { ...state, tripsList: {trips: [], error: null, loading: true} };
      case FETCH_TRIPS_SUCCESS:
        return { ...state, tripsList: {trips: action.payload, error: null, loading: false} };
        default:
            return state;
    }
}
