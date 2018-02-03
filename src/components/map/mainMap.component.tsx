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
import LatLngBounds = google.maps.LatLngBounds;

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
  viewport: LatLngBounds;

  fetchTrips(): void;

  fetchSuggestions(): void;

  fetchArticleAndMedias(point: Point): void;

  zoomOnPoint(point: Point): void;

  createSuggestion(place: PlaceResult): void;

  onZoomChanged(zoom: number): void;
}

interface State {
  modalOpened: boolean;
}

class MainMap extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.fetchArticleAndMedias = this.fetchArticleAndMedias.bind(this);
    this.zoomOnPoint = this.zoomOnPoint.bind(this);
    this.createSuggestion = this.createSuggestion.bind(this);
    this.onZoomChanged = this.onZoomChanged.bind(this);
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
    const citiesPoint = trips.map((trip: Trip) => trip.arrival);
    const uniqueCitiesPoint: Point[] = [];
    citiesPoint.forEach((item: Point) => {
      const i = uniqueCitiesPoint.findIndex((x: Point) => x.id === item.id);
      if (i <= -1) {
        uniqueCitiesPoint.push(item);
      }
    });
    if (trips.length > 0) {
      uniqueCitiesPoint.push(trips[trips.length - 1].departure);
    }
    return (
      <div>
        <GoogleMapComponent
          googleMapURL={GOOGLE_URL}
          loadingElement={<div style={{ height: `100%` }}/>}
          containerElement={<div className="map-container"/>}
          mapElement={<div style={{ height: `100%` }}/>}
          trips={trips}
          cities={uniqueCitiesPoint}
          onMarkerClick={this.fetchArticleAndMedias}
          onMarkerDblClick={this.zoomOnPoint}
          createSuggestion={this.createSuggestion}
          onZoomChanged={this.onZoomChanged}
          {...this.props}
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

  private onZoomChanged(zoom: number) {
    this.props.onZoomChanged(zoom);
  }

  private createSuggestion(place: PlaceResult) {
    this.props.createSuggestion(place);
  }

}

export default MainMap;
