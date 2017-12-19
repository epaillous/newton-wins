import { Trip, TripInterface } from '../models/trip';
import wretch from 'wretch';

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';

const ROOT_URL = 'http://newton-wins-api.herokuapp.com';

function fetchTripsSuccess(trips: Trip[]) {
  return {
    type: FETCH_TRIPS_SUCCESS,
    payload: trips
  };
}

function fetchTripsFailure(error: any) {
  return {
    type: FETCH_TRIPS_FAILURE,
    payload: error
  };
}

function requestTrips() {
  return {
    type: FETCH_TRIPS,
    payload: {}
  };
}

export function fetchTrips() {
  return (dispatch: any) => {
    dispatch(requestTrips());
    return wretch(ROOT_URL + '/trips').get()
      .json(json => {
        let trips = json.map((item: TripInterface) => new Trip(item));
        dispatch(fetchTripsSuccess(trips));
  })
      .catch((error: any) => {
        dispatch(fetchTripsFailure(error));
      });
  };
}
