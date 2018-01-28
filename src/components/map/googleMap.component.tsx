import * as moment from 'moment';
import * as React from 'react';
import {
  GoogleMap, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'reactstrap';
import SuggestionMarker from '../../containers/suggestionMarker.container';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';
import { Trip } from '../../models/trip';
import { CityMarker } from './cityMarker/cityMarker.component';
import InfoWindowMarkerComponent from './infoWindowMarker/infoWindowMarker.component';
import { lowLevelStyles } from './lowLevelStyles';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { styles } from './styles';
import { TripPolyline } from './tripPolyline.component';

interface GoogleMapProps {
  cities: Point[];
  trips: Trip[];
  suggestions: Suggestion[];
  center: LatLng;
  zoom: number;
  place: PlaceResult;

  onMarkerClick(point: Point): void;

  onMarkerDblClick(point: Point): void;

  createSuggestion(place: PlaceResult): void;

  onZoomChanged(zoom: number): void;
}

class GoogleMapComponent extends React.Component<GoogleMapProps & RouteComponentProps<any>> {
  private trips: Trip[];
  private options = {
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 2,
    streetViewControl: false
  };
  private map: GoogleMap;

  constructor(props: GoogleMapProps & RouteComponentProps<any>) {
    super(props);
    this.renderPlaceSelected = this.renderPlaceSelected.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderCity = this.renderCity.bind(this);
    this.createSuggestion = this.createSuggestion.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
  }

  public componentWillMount() {
    this.trips = this.props.trips.filter((trip) => trip.date.isSameOrBefore(moment()));
  }

  public render() {
    return (
      <GoogleMap
        zoom={this.props.zoom}
        center={this.props.center}
        defaultOptions={this.options}
        onZoomChanged={this.onZoomChange}
        ref={this.onMapMounted}
        options={{ styles: this.styles }}
      >
        {this.trips.map((trip: Trip) => <TripPolyline key={trip.id} trip={trip}/>)}
        {this.props.cities.map(this.renderCity)}
        {this.props.suggestions.map(this.renderSuggestion)}
        {this.renderPlaceSelected()}
      </GoogleMap>
    );
  }

  private onMapMounted(ref: any) {
    this.map = ref;
  }

  private onZoomChange() {
    this.props.onZoomChanged(this.map.getZoom());
  }

  private createSuggestion() {
    this.props.createSuggestion(this.props.place);
    this.props.history.push('/suggestions/new');
  }

  private renderSuggestion(suggestion: Suggestion) {
    return <SuggestionMarker key={suggestion.id} suggestion={suggestion} {...this.props}/>;
  }

  private renderPlaceSelected() {
    if (this.props.place) {
      return (
        <InfoWindowMarkerComponent
          position={this.props.place.geometry.location.toJSON()}
          icon={new MarkerViewModel(MarkerType.Suggestion).icon}
          title={this.props.place.name}
        >
          <div className="info-window">
            <h6>{this.props.place.name}</h6>
            <p>{this.props.place.formatted_address}</p>
            <Button color="danger" onClick={this.createSuggestion}>
              Suggérer ce lieu !
            </Button>
          </div>
        </InfoWindowMarkerComponent>
      );
    }
    return null;
  }

  private get styles() {
    if (this.props.zoom <= 10) {
      return styles;
    } else {
      return lowLevelStyles;
    }
  }

  private renderCity(point: Point) {
    return (
      <CityMarker
        point={point}
        onMarkerClick={this.props.onMarkerClick}
        onMarkerDblClick={this.props.onMarkerDblClick}
        isCurrent={point === this.trips[0].arrival}
        key={point.id}
      />
    );
  }
}

export default withRouter(withScriptjs(withGoogleMap(GoogleMapComponent)));
