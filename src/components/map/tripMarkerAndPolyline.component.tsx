import * as React from 'react';
import { PolylineViewModel } from './polyline.viewModel';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { Marker, Polyline } from 'react-google-maps';
import { Trip } from '../../models/trip';
import { Point } from '../../models/point';

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
  return (
    <div key={props.trip.id}>
      <Marker
        position={props.trip.arrival.googleMapPoint}
        onClick={() => props.onMarkerClick(props.trip.arrival)}
        onDblClick={() => props.onMarkerDblClick(props.trip.arrival)}
        icon={markerViewModel.icon}
        animation={props.trip === props.trips[0] ? google.maps.Animation.BOUNCE : undefined}
      />
      <Polyline path={viewModel.path} options={viewModel.options}/>
    </div>
  );
};
