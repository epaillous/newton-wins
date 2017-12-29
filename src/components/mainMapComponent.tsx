import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Trip, TypeTrip } from '../models/trip';
import * as moment from 'moment';
import { Point } from '../models/point';
import './mainMapComponent.css';
import PolylineOptions = google.maps.PolylineOptions;
import { GOOGLE_API_KEY } from '../actions/utils';
import { LoaderComponent } from './loaderComponent';

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + GOOGLE_API_KEY;

interface GoogleMapProps {
  trips: Trip[];
  center: Point;
  zoom: number;

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
  center: Point;
  zoom: number;

  fetchTrips(): void;

  fetchArticleAndMedias(point: Point): void;

  zoomOnPoint(point: Point): void;
}

class MarkerViewModel {
  icon: any;

  constructor(point: Point) {
    this.icon = {
      path: 'M 32.50,12.50 C 32.50,14.54 32.01,16.47 31.14,18.17 31.14,18.17 20.00,40.00 20.00,40.00\n' +
      '20.00,40.00 8.77,17.99 8.72,17.90 7.94,16.27 7.50,14.43 7.50,12.50 7.50,5.60 13.10,0.00 20.00,0.00\n' +
      '26.90,0.00 32.50,5.60 32.50,12.50 Z M 27.50,12.50 C 27.50,8.36 24.14,5.00 20.00,5.00\n' +
      '15.86,5.00 12.50,8.36 12.50,12.50 12.50,16.64 15.86,20.00 20.00,20.00 24.14,20.00 27.50,16.64 27.50,12.50 Z',
      fillColor: point.articles.length > 0 ? '#dc3545' : '#ffc107',
      fillOpacity: 1,
      anchor: {x: 20, y: 40},
      strokeWeight: 2
    };
  }
}

class PolylineViewModel {
  path: any[];
  options: PolylineOptions;

  constructor(trip: Trip) {
    this.path = [trip.departure.googleMapPoint, trip.arrival.googleMapPoint];
    let options: PolylineOptions = {};
    if (trip.mode === TypeTrip.plane) {
      options.icons = this.computeIcons(trip);
      options.geodesic = true;
      options.strokeOpacity = 0;
      options.strokeWeight = 2;
    } else {
      options.strokeWeight = 1;
    }
    this.options = options;
  }

  computeIcons(trip: Trip) {
    let lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    return [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }];
  }
}

const GoogleMapComponent = withScriptjs(withGoogleMap((props: GoogleMapProps) =>
  (
    <GoogleMap
      zoom={props.zoom}
      center={props.center.googleMapPoint}
      defaultOptions={{
        minZoom: 2,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: [
          {
            'stylers': [
              {
                'hue': '#bbff00'
              },
              {
                'gamma': 0.5
              },
              {
                'weight': 0.5
              }
            ]
          },
          {
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'on'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#f4f9e8'
              },
              {
                'weight': 2.7
              }
            ]
          },
          {
            'featureType': 'administrative.province',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'landscape.man_made',
            'stylers': [
              {
                'color': '#718e32'
              }
            ]
          },
          {
            'featureType': 'landscape.natural',
            'stylers': [
              {
                'color': '#a4cc48'
              }
            ]
          },
          {
            'featureType': 'poi',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'water',
            'stylers': [
              {
                'color': '#4aaecc'
              }
            ]
          }
        ]
      }}
    >
      {
        props.trips.filter(trip => trip.date.isSameOrBefore(moment()))
          .map((trip) => {
              let viewModel = new PolylineViewModel(trip);
              let markerViewModel = new MarkerViewModel(trip.arrival);
              return (
                <div key={trip.id}>
                  <Marker
                    position={trip.arrival.googleMapPoint}
                    onClick={() => props.onMarkerClick(trip.arrival)}
                    onDblClick={() => props.onMarkerDblClick(trip.arrival)}
                    icon={markerViewModel.icon}
                  />
                  <Polyline path={viewModel.path} options={viewModel.options}/>
                </div>
              );
            }
          )
      }
    </GoogleMap>
  )
));

class MainMap extends React.Component<Props> {

  componentWillMount() {
    this.props.fetchTrips();
  }

  render() {
    const {trips, loading, error} = this.props.tripsList;
    console.log(this.props);
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
      <GoogleMapComponent
        googleMapURL={GOOGLE_URL}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div className="map-container"/>}
        mapElement={<div style={{height: `100%`}}/>}
        trips={trips}
        onMarkerClick={(point: Point) => this.props.fetchArticleAndMedias(point)}
        onMarkerDblClick={(point: Point) => this.props.zoomOnPoint(point)}
        center={this.props.center}
        zoom={this.props.zoom}
      />
    );
  }
}

export default MainMap;
