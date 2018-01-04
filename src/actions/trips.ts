import { Trip, TripInterface } from '../models/trip';
import wretch from 'wretch';
import { ROOT_URL } from './utils';

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';

function fetchTripsSuccess(trips: Trip[]) {
  return {
    type: FETCH_TRIPS_SUCCESS,
    payload: trips,
  };
}

function fetchTripsFailure(error: any) {
  return {
    type: FETCH_TRIPS_FAILURE,
    payload: error,
  };
}

function requestTrips() {
  return {
    type: FETCH_TRIPS,
    payload: {},
  };
}

export function fetchTrips() {
  return (dispatch: any) => {
    dispatch(requestTrips());
    return wretch(ROOT_URL + '/trips').get()
      .json((json: any) => {
        const trips = json.trips.map((item: TripInterface) => new Trip(item));
        dispatch(fetchTripsSuccess(trips));
      })
      .catch((error: any) => {
        dispatch(fetchTripsFailure(error));
      });
  };
}
