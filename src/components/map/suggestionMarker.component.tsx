import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';
import { SuggestionType } from '../../models/suggestionType';
import Delete from '../icons/delete.icon.component';
import Edit from '../icons/edit.icon.component';
import SuggestionTypeIcon from './../suggestionTypeIcon/suggestionTypeIcon.component';
import InfoWindowMarkerComponent from './infoWindowMarker/infoWindowMarker.component';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import './suggestionMarker.component.css';

interface InfoWindowSuggestionProps {
  name: string;
  address: string;
  iconType: SuggestionType | undefined;
  type: string | undefined;
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
  return (
    <div className="info-window">
      <h6>
        <SuggestionTypeIcon type={props.iconType}/>
        <p>{props.type}</p>
      </h6>
      <div className="suggestions-infos">
        <div className="name">{props.name}</div>
        <div>{props.address}</div>
      </div>
      <div className="actions">
        <a onClick={props.onEditClick}><Edit/></a>
        <a onClick={props.onDeleteClick}><Delete/></a>
      </div>
    </div>
  );
};

class MarkerForSuggestion extends React.Component<Props & RouteComponentProps<any>, State> {
  private markerViewModel = new MarkerViewModel(MarkerType.Suggestion);

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.editSuggestion = this.editSuggestion.bind(this);
    this.deleteSuggestion = this.deleteSuggestion.bind(this);
    this.state = {
      infoWindowOpened: false
    };
  }

  public render() {
    return (
      <InfoWindowMarkerComponent
        position={this.props.suggestion.point.googleMapPoint}
        icon={this.markerViewModel.icon}
        title={this.props.suggestion.name}
        isOpened={this.state.infoWindowOpened}
      >
        <InfoWindowSuggestion
          name={this.props.suggestion.name}
          address={this.props.suggestion.address}
          iconType={this.props.suggestion.suggestionType}
          type={this.props.suggestion.suggestionType ? this.props.suggestion.suggestionType.title : undefined}
          onEditClick={this.editSuggestion}
          onDeleteClick={this.deleteSuggestion}
        />
      </InfoWindowMarkerComponent>
    );
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
