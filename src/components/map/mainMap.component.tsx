import * as React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap,
  Polyline, Marker, InfoWindow,
} from 'react-google-maps';
import { Trip, TypeTrip } from '../../models/trip';
import * as moment from 'moment';
import { Point } from '../../models/point';
import './mainMap.component.css';
import PolylineOptions = google.maps.PolylineOptions;
import { GOOGLE_URL } from '../../actions/utils';
import { LoaderComponent } from '../loader/loader.component';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Button } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { Suggestion } from '../../models/suggestion';

interface GoogleMapProps {
  trips: Trip[];
  suggestions: Suggestion[];
  center: LatLng;
  zoom: number;
  place: PlaceResult;

  onMarkerClick(point: Point): void;

  onMarkerDblClick(point: Point): void;
}

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

enum MarkerType {
  WithArticles,
  Suggestion,
  Normal,
}

class MarkerViewModel {
  icon: any;
  infoWindowOpened = false;

  constructor(markerType: MarkerType) {
    this.icon = {
      // tslint:disable-next-line:max-line-length
      path: 'M 32.50,12.50 C 32.50,14.54 32.01,16.47 31.14,18.17 31.14,18.17 20.00,40.00 20.00,40.00\n' +
      // tslint:disable-next-line:max-line-length
      '20.00,40.00 8.77,17.99 8.72,17.90 7.94,16.27 7.50,14.43 7.50,12.50 7.50,5.60 13.10,0.00 20.00,0.00\n' +
      '26.90,0.00 32.50,5.60 32.50,12.50 Z M 27.50,12.50 C 27.50,8.36 24.14,5.00 20.00,5.00\n' +
      // tslint:disable-next-line:max-line-length
      '15.86,5.00 12.50,8.36 12.50,12.50 12.50,16.64 15.86,20.00 20.00,20.00 24.14,20.00 27.50,16.64 27.50,12.50 Z',
      fillColor: MarkerViewModel.colorForType(markerType),
      fillOpacity: 1,
      anchor: { x: 20, y: 40 },
      strokeWeight: 2,
    };
  }

  private static colorForType(type: MarkerType) {
    switch (type) {
      case MarkerType.Suggestion:
        return '#f8f9fa';
      case MarkerType.WithArticles:
        return '#dc3545';
      case MarkerType.Normal:
      default:
        return '#ffc107';
    }
  }
}

class PolylineViewModel {
  path: any[];
  options: PolylineOptions;

  constructor(trip: Trip) {
    this.path = [trip.departure.googleMapPoint, trip.arrival.googleMapPoint];
    const options: PolylineOptions = {};
    if (trip.mode === TypeTrip.plane) {
      options.icons = PolylineViewModel.computeIcons(trip);
      options.geodesic = true;
      options.strokeOpacity = 0;
      options.strokeWeight = 2;
    } else {
      options.strokeWeight = 1;
    }
    this.options = options;
  }

  private static computeIcons(trip: Trip) {
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4,
    };
    return [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px',
    }];
  }
}

const GoogleMapComponent = withRouter(withScriptjs(withGoogleMap(
  (props: GoogleMapProps & RouteComponentProps<any>) => {
    const trips = props.trips.filter(trip => trip.date.isSameOrBefore(moment()));
    return (
      <GoogleMap
        zoom={props.zoom}
        center={props.center}
        defaultOptions={{
          minZoom: 2,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              stylers: [
                {
                  hue: '#bbff00',
                },
                {
                  gamma: 0.5,
                },
                {
                  weight: 0.5,
                },
              ],
            },
            {
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'administrative',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f4f9e8',
                },
                {
                  weight: 2.7,
                },
              ],
            },
            {
              featureType: 'administrative.province',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'landscape.man_made',
              stylers: [
                {
                  color: '#718e32',
                },
              ],
            },
            {
              featureType: 'landscape.natural',
              stylers: [
                {
                  color: '#a4cc48',
                },
              ],
            },
            {
              featureType: 'poi',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'water',
              stylers: [
                {
                  color: '#4aaecc',
                },
              ],
            },
          ],
        }}
      >
        {
          trips.map((trip) => {
              const viewModel = new PolylineViewModel(trip);
              const markerViewModel =
                new MarkerViewModel(trip.arrival.articles.length > 0 ?
                  MarkerType.WithArticles : MarkerType.Normal);
              return (
                <div key={trip.id}>
                  <Marker
                    position={trip.arrival.googleMapPoint}
                    onClick={() => props.onMarkerClick(trip.arrival)}
                    onDblClick={() => props.onMarkerDblClick(trip.arrival)}
                    icon={markerViewModel.icon}
                    animation={trip === trips[0] ? google.maps.Animation.BOUNCE : undefined}
                  />
                  <Polyline path={viewModel.path} options={viewModel.options}/>
                </div>
              );
            },
          )
        }
        {
          props.suggestions.map((suggestion: Suggestion) => {
              const markerViewModel =
                new MarkerViewModel(MarkerType.Suggestion);
              return (
                <Marker
                  position={suggestion.point.googleMapPoint}
                  icon={markerViewModel.icon}
                  key={suggestion.id}
                  onClick={() => markerViewModel.infoWindowOpened = true}
                  onDblClick={() => props.onMarkerDblClick(suggestion.point)}
                >
                  {markerViewModel.infoWindowOpened &&
                  <InfoWindow onCloseClick={() => markerViewModel.infoWindowOpened = false}>
                    <div className="info-window">
                      <h6>{suggestion.name}</h6>
                      <p>{suggestion.address}</p>
                    </div>
                  </InfoWindow>
                  }
                </Marker>
              );
            },
          )
        }
        {props.place &&
        <Marker
          position={props.place.geometry.location}
          icon={new MarkerViewModel(MarkerType.Suggestion).icon}
          title={props.place.name}
        >
          <InfoWindow>
            <div className="info-window">
              <h6>{props.place.name}</h6>
              <p>{props.place.formatted_address}</p>
              <Button color="danger" onClick={() => props.history.push('/suggestions/new')}>
                Suggérer ce lieu !
              </Button>
            </div>
          </InfoWindow>
        </Marker>
        }
      </GoogleMap>
    );
  })));

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
