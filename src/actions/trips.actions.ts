import { Action, ActionCreator, Dispatch } from 'redux';
import { fetch } from 'redux-auth';
import { ThunkAction } from 'redux-thunk';
import { Trip, TripInterface } from '../models/trip';
import { ROOT_URL } from './utils';

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';

interface TripsInterface {
  trips: TripInterface[];
}

const fetchTripsSuccess: ActionCreator<Action> = (trips: Trip[]) => {
  return {
    payload: trips,
    type: FETCH_TRIPS_SUCCESS,
  };
};

const fetchTripsFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_TRIPS_FAILURE,
  };
};

const requestTrips: ActionCreator<Action> = () => {
  return {
    type: FETCH_TRIPS,
  };
};

export const fetchTrips: ActionCreator<ThunkAction<Action, any, void>> = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestTrips());
    return fetch(ROOT_URL + '/trips')
      .then((response: Response) => response.json())
      .then((json: TripsInterface) => {
        const trips = json.trips.map((item: TripInterface) => new Trip(item));
        dispatch(fetchTripsSuccess(trips));
      })
      .catch((error: Error) => {
        dispatch(fetchTripsFailure(error));
      });
  };
};
