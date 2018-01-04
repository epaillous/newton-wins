import PlaceResult = google.maps.places.PlaceResult;

export const SELECT_PLACE = 'SELECT_PLACE';

export function selectPlace(place: PlaceResult) {
  return {
    type: SELECT_PLACE,
    payload: place,
  };
}
