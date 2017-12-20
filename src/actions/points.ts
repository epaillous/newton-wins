import { Point } from '../models/point';

export const SELECT_POINT = 'SELECT_POINT';

export function selectPoint(point: Point) {
  return {
    type: SELECT_POINT,
    payload: point
  };
}
