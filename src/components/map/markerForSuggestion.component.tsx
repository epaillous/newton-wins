import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import { RouteComponentProps, withRouter } from 'react-router';
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';
import Delete from '../icons/delete.icon.component';
import Edit from '../icons/edit.icon.component';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import './markerForSuggestion.component.css';

interface InfoWindowSuggestionProps {
  name: string;
  address: string;
  isOpened: boolean;
  onCloseClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

interface Props {
  suggestion: Suggestion;
  onMarkerDblClick: (point: Point) => void;
  editSuggestion: (suggestion: Suggestion) => void;
  deleteSuggestion: (suggestion: Suggestion) => void;
}

interface State {
  infoWindowOpened: boolean;
}

const InfoWindowSuggestion = (props: InfoWindowSuggestionProps) => {
  if (!props.isOpened) {
    return null;
  }
  return (
    <InfoWindow onCloseClick={props.onCloseClick}>
      <div className="info-window">
        <h6>{props.name}</h6>
        <p>{props.address}</p>
        <div className="actions">
          <a onClick={props.onEditClick}><Edit/></a>
          <a onClick={props.onDeleteClick}><Delete/></a>
        </div>
      </div>
    </InfoWindow>
  );
};

class MarkerForSuggestion extends React.Component<Props & RouteComponentProps<any>, State> {
  private markerViewModel = new MarkerViewModel(MarkerType.Suggestion);

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.editSuggestion = this.editSuggestion.bind(this);
    this.deleteSuggestion = this.deleteSuggestion.bind(this);
    this.state = {
      infoWindowOpened: false
    };
  }

  public render() {
    return (
      <Marker
        position={this.props.suggestion.point.googleMapPoint}
        icon={this.markerViewModel.icon}
        key={this.props.suggestion.id}
        onClick={this.openInfoWindow}
        onDblClick={this.onDoubleClick}
      >
        <InfoWindowSuggestion
          name={this.props.suggestion.name}
          address={this.props.suggestion.address}
          isOpened={this.state.infoWindowOpened}
          onCloseClick={this.closeInfoWindow}
          onEditClick={this.editSuggestion}
          onDeleteClick={this.deleteSuggestion}
        />
      </Marker>
    );
  }

  private closeInfoWindow() {
    this.setState({ infoWindowOpened: false });
  }

  private openInfoWindow() {
    this.setState({ infoWindowOpened: true });
  }

  private onDoubleClick() {
    this.props.onMarkerDblClick(this.props.suggestion.point);
  }

  private editSuggestion() {
    this.props.editSuggestion(this.props.suggestion);
    this.props.history.push('/suggestions/edit');
  }

  private deleteSuggestion() {
    this.props.deleteSuggestion(this.props.suggestion);
  }

}

export default withRouter(MarkerForSuggestion);
