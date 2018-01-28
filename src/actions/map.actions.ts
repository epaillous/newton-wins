import { Action, ActionCreator } from 'redux';

export const ZOOM_CHANGED = 'ZOOM_CHANGED';

export const zoomChanged: ActionCreator<Action> = (zoom: number) => {
  return {
    payload: zoom,
    type: ZOOM_CHANGED,
  };
};
