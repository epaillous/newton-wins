import * as React from 'react';
import { Marker, Polyline } from 'react-google-maps';
import { Point } from '../../models/point';
import { Trip } from '../../models/trip';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { PolylineViewModel } from './polyline.viewModel';

interface Props {
  trip: Trip;
  onMarkerClick: (point: Point) => void;
  onMarkerDblClick: (point: Point) => void;
  trips: Trip[];
}

export const TripMarkerAndPolyline = (props: Props) => {
  const viewModel = new PolylineViewModel(props.trip);
  const markerViewModel =
    new MarkerViewModel(props.trip.arrival.articles.length > 0 ?
      MarkerType.WithArticles : MarkerType.Normal);
  const onMarkerClick = () => props.onMarkerClick(props.trip.arrival);
  const onMarkerDblClick = () => props.onMarkerDblClick(props.trip.arrival);
  return (
    <div key={props.trip.id}>
      <Marker
        position={props.trip.arrival.googleMapPoint}
        onClick={onMarkerClick}
        onDblClick={onMarkerDblClick}
        icon={markerViewModel.icon}
        animation={props.trip === props.trips[0] ? google.maps.Animation.BOUNCE : undefined}
      />
      <Polyline path={viewModel.path} options={viewModel.options}/>
    </div>
  );
};
