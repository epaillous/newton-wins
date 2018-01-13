import * as React from 'react';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { Marker, InfoWindow } from 'react-google-maps';
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';

interface Props {
  suggestion: Suggestion;
  onMarkerDblClick: (point: Point) => void;
}

export const MarkerForSuggestion = (props: Props) => {
  const markerViewModel =
    new MarkerViewModel(MarkerType.Suggestion);
  return (
    <Marker
      position={props.suggestion.point.googleMapPoint}
      icon={markerViewModel.icon}
      key={props.suggestion.id}
      onClick={() => markerViewModel.infoWindowOpened = true}
      onDblClick={() => props.onMarkerDblClick(props.suggestion.point)}
    >
      {markerViewModel.infoWindowOpened &&
      <InfoWindow onCloseClick={() => markerViewModel.infoWindowOpened = false}>
        <div className="info-window">
          <h6>{props.suggestion.name}</h6>
          <p>{props.suggestion.address}</p>
        </div>
      </InfoWindow>
      }
    </Marker>
  );
};