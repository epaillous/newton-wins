import * as React from 'react';
import { Polyline } from 'react-google-maps';
import { Trip } from '../../models/trip';
import { PolylineViewModel } from './polyline.viewModel';

interface Props {
  trip: Trip;
}

export const TripPolyline = (props: Props) => {
  const viewModel = new PolylineViewModel(props.trip);
  return (
    <Polyline path={viewModel.path} options={viewModel.options} key={props.trip.id}/>
  );
};
