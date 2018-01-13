import { Trip, TripInterface } from '../models/trip';
import { ROOT_URL } from './utils';
import { fetch } from 'redux-auth';

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
    return fetch(ROOT_URL + '/trips')
      .then((response: any) => response.json())
      .then((json: any) => {
        const trips = json.trips.map((item: TripInterface) => new Trip(item));
        dispatch(fetchTripsSuccess(trips));
      })
      .catch((error: any) => {
        dispatch(fetchTripsFailure(error));
      });
  };
}
