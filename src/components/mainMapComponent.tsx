import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Trip, TypeTrip } from '../models/trip';
import * as moment from 'moment';
import { Point } from '../models/point';
import './mainMapComponent.css';
import PolylineOptions = google.maps.PolylineOptions;

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD6U6m8yNBaX1O3tN_USErl1v-i_8pPibU';

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

  fetchArticle(point: Point): void;

  zoomOnPoint(point: Point): void;
}

class PolylineViewModel {
  path: any[];
  options: PolylineOptions;

  constructor(trip: Trip) {
    this.path = [trip.departure.googleMapPoint, trip.arrival.googleMapPoint];
    this.options = {
      strokeWeight: trip.mode === TypeTrip.plane ? 2 : 1,
      geodesic: trip.mode === TypeTrip.plane
    };
  }
}

const GoogleMapComponent = withScriptjs(withGoogleMap((props: GoogleMapProps) =>
  (
    <GoogleMap
      zoom={props.zoom}
      center={props.center.googleMapPoint}
      defaultOptions={{
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
              return (
                <div key={trip.id}>
                  <Marker
                    position={trip.arrival.googleMapPoint}
                    onClick={() => props.onMarkerClick(trip.arrival)}
                    onDblClick={() => props.onMarkerDblClick(trip.arrival)}
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
        <h1>Chargement</h1>
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
        onMarkerClick={(point: Point) => this.props.fetchArticle(point)}
        onMarkerDblClick={(point: Point) => this.props.zoomOnPoint(point)}
        center={this.props.center}
        zoom={this.props.zoom}
      />
    );
  }
}

export default MainMap;
