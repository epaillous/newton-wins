import * as React from 'react';
import { Trip } from '../../models/trip';
import { Point } from '../../models/point';
import './mainMap.component.css';
import { GOOGLE_URL } from '../../actions/utils';
import { LoaderComponent } from '../loader/loader.component';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Suggestion } from '../../models/suggestion';
import { GoogleMapComponent } from './googleMap.component';

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

  componentWillMount() {
    this.props.fetchTrips();
    this.props.fetchSuggestions();
  }

  render() {
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
          onMarkerClick={(point: Point) => this.props.fetchArticleAndMedias(point)}
          onMarkerDblClick={(point: Point) => this.props.zoomOnPoint(point)}
          center={this.props.center}
          zoom={this.props.zoom}
          place={this.props.place}
          suggestions={this.props.suggestions}
        />
      </div>
    );
  }

}

export default MainMap;
