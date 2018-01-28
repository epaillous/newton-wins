import * as React from 'react';
import { Marker } from 'react-google-maps';
import { Point } from '../../../models/point';
import { MarkerType, MarkerViewModel } from '../marker.viewModel';

interface Props {
  point: Point;
  onMarkerClick: (point: Point) => void;
  onMarkerDblClick: (point: Point) => void;
  isCurrent: boolean;
}

export const CityMarker = (props: Props) => {
  const markerViewModel =
    new MarkerViewModel(props.point.articles.length > 0 ? MarkerType.WithArticles : MarkerType.Normal);
  const onMarkerClick = () => props.onMarkerClick(props.point);
  const onMarkerDblClick = () => props.onMarkerDblClick(props.point);
  return (
    <Marker
      position={props.point.googleMapPoint}
      onClick={onMarkerClick}
      onDblClick={onMarkerDblClick}
      icon={markerViewModel.icon}
      animation={props.isCurrent ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};
