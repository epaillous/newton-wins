import { Action, ActionCreator } from 'redux';
import { Point } from '../models/point';

export const SELECT_POINT = 'SELECT_POINT';
export const ZOOM_ON_POINT = 'ZOOM_ON_POINT';

export const selectPoint: ActionCreator<Action> = (point: Point) => {
  return {
    payload: point,
    type: SELECT_POINT,
  };
};

export const zoomOnPoint: ActionCreator<Action> = (point: Point) => {
  return {
    payload: point,
    type: ZOOM_ON_POINT,
  };
};
