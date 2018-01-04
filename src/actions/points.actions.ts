import { Point } from '../models/point';

export const SELECT_POINT = 'SELECT_POINT';
export const ZOOM_ON_POINT = 'ZOOM_ON_POINT';

export function selectPoint(point: Point) {
  return {
    type: SELECT_POINT,
    payload: point,
  };
}

export function zoomOnPoint(point: Point) {
  return {
    type: ZOOM_ON_POINT,
    payload: point,
  };
}
