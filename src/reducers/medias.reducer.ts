import { FETCH_MEDIAS, FETCH_MEDIAS_SUCCESS } from '../actions/medias';
import { Media } from '../models/media';

interface MediasStateInterface {
  mediasList: Media[];
  loading: boolean;
  error: any;
}

const INITIAL_STATE = { mediasList: [], error: null, loading: false };

export default function medias(state: MediasStateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_MEDIAS:
      return { ...state, mediasList: [], loading: true, error: null };
    case FETCH_MEDIAS_SUCCESS:
      return { ...state, mediasList: action.payload, loading: false, error: null };
    default:
      return state;
  }
}
