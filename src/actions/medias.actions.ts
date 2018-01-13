import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Media, MediaInterface } from '../models/media';
import { Point } from '../models/point';
import { ROOT_URL } from './utils';

export const FETCH_MEDIAS = 'FETCH_MEDIAS';
export const FETCH_MEDIAS_SUCCESS = 'FETCH_MEDIAS_SUCCESS';
export const FETCH_MEDIAS_FAILURE = 'FETCH_MEDIAS_FAILURE';

interface MediasInterface {
  media: Media[];
}

const fetchMediasSuccess: ActionCreator<Action> = (medias: Media[]) => {
  return {
    payload: medias,
    type: FETCH_MEDIAS_SUCCESS,
  };
};

const fetchMediasFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_MEDIAS_FAILURE,
  };
};

const requestMedias: ActionCreator<Action> = (point: Point) => {
  return {
    payload: {},
    type: FETCH_MEDIAS,
  };
};

export const fetchMedias: ActionCreator<ThunkAction<Promise<void>, any, void>> = (point: Point) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestMedias(point));
    return fetch(ROOT_URL + '/points/' + point.id + '/media')
      .then((response: Response) => response.json())
      .then((json: MediasInterface) => {
        const medias = json.media.map((media: MediaInterface) => new Media(media));
        dispatch(fetchMediasSuccess(medias));
      })
      .catch((error: Error) => {
        dispatch(fetchMediasFailure(error));
      });
  };
};
