import { Media, MediaInterface } from '../models/media';
import wretch from 'wretch';
import { ROOT_URL } from './utils';
import { Point } from '../models/point';

export const FETCH_MEDIAS = 'FETCH_MEDIAS';
export const FETCH_MEDIAS_SUCCESS = 'FETCH_MEDIAS_SUCCESS';
export const FETCH_MEDIAS_FAILURE = 'FETCH_MEDIAS_FAILURE';

function fetchMediasSuccess(medias: Media[]) {
  return {
    type: FETCH_MEDIAS_SUCCESS,
    payload: medias,
  };
}

function fetchMediasFailure(error: any) {
  return {
    type: FETCH_MEDIAS_FAILURE,
    payload: error,
  };
}

function requestMedias(point: Point) {
  return {
    type: FETCH_MEDIAS,
    payload: {},
  };
}

export function fetchMedias(point: Point) {
  return (dispatch: any) => {
    dispatch(requestMedias(point));
    return wretch(ROOT_URL + '/points/' + point.id + '/media').get()
      .json((json: any) => {
        const medias = json.media.map((media: MediaInterface) => new Media(media));
        dispatch(fetchMediasSuccess(medias));
      })
      .catch((error: any) => {
        dispatch(fetchMediasFailure(error));
      });
  };
}
