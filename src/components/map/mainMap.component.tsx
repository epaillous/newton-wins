import * as React from 'react';
import { GOOGLE_URL } from '../../actions/utils';
import { Point } from '../../models/point';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Suggestion } from '../../models/suggestion';
import { Trip } from '../../models/trip';
import { LoaderComponent } from '../loader/loader.component';
import GoogleMapComponent from './googleMap.component';
import './mainMap.component.css';

interface TripsProps {
  trips: Trip[];
  loading: boolean;
  error: any;
}

interface Props {
  tripsList: TripsProps;
  center: LatLng;
  zoom: number;
  place: PlaceResult;
  suggestions: Suggestion[];

  fetchTrips(): void;

  fetchSuggestions(): void;

  fetchArticleAndMedias(point: Point): void;

  zoomOnPoint(point: Point): void;
}

interface State {
  modalOpened: boolean;
}

class MainMap extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.fetchArticleAndMedias = this.fetchArticleAndMedias.bind(this);
    this.zoomOnPoint = this.zoomOnPoint.bind(this);
  }

  public componentWillMount() {
    this.props.fetchTrips();
    this.props.fetchSuggestions();
  }

  public render() {
    const { trips, loading, error } = this.props.tripsList;
    if (loading) {
      return (
        <LoaderComponent/>
      );
    }
    if (error) {
      return (
        <h1>Erreur</h1>
      );
    }
    return (
      <div>
        <GoogleMapComponent
          googleMapURL={GOOGLE_URL}
          loadingElement={<div style={{ height: `100%` }}/>}
          containerElement={<div className="map-container"/>}
          mapElement={<div style={{ height: `100%` }}/>}
          trips={trips}
          onMarkerClick={this.fetchArticleAndMedias}
          onMarkerDblClick={this.zoomOnPoint}
          center={this.props.center}
          zoom={this.props.zoom}
          place={this.props.place}
          suggestions={this.props.suggestions}
        />
      </div>
    );
  }

  private fetchArticleAndMedias(point: Point) {
    this.props.fetchArticleAndMedias(point);
  }

  private zoomOnPoint(point: Point) {
    this.props.zoomOnPoint(point);
  }

}

export default MainMap;
