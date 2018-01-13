import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';
import { MarkerType, MarkerViewModel } from './marker.viewModel';

interface Props {
  suggestion: Suggestion;
  onMarkerDblClick: (point: Point) => void;
}

export const MarkerForSuggestion = (props: Props) => {
  const markerViewModel = new MarkerViewModel(MarkerType.Suggestion);
  const onClick = () => markerViewModel.infoWindowOpened = true;
  const onDoubleClick = () => props.onMarkerDblClick(props.suggestion.point);
  const onCloseClick = () => markerViewModel.infoWindowOpened = false;

  const renderInfoWindow = () => {
    if (markerViewModel.infoWindowOpened) {
      return (
        <InfoWindow onCloseClick={onCloseClick}>
          <div className="info-window">
            <h6>{props.suggestion.name}</h6>
            <p>{props.suggestion.address}</p>
          </div>
        </InfoWindow>
      );
    }
    return null;
  };

  return (
    <Marker
      position={props.suggestion.point.googleMapPoint}
      icon={markerViewModel.icon}
      key={props.suggestion.id}
      onClick={onClick}
      onDblClick={onDoubleClick}
    >
      {renderInfoWindow()}
    </Marker>
  );
};
