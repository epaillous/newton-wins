import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Trip } from '../models/trip';
import * as moment from 'moment';
import { Point } from '../models/point';

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

const GoogleMapComponent = withScriptjs(withGoogleMap((props: GoogleMapProps) =>
  (
    <GoogleMap
      zoom={props.zoom}
      center={props.center.googleMapPoint}
    >
      {
        props.trips.filter(trip => trip.date.isSameOrBefore(moment())).map((trip) =>
          <div key={trip.id}>
            <Marker
              position={trip.arrival.googleMapPoint}
              onClick={() => props.onMarkerClick(trip.arrival)}
              onDblClick={() => props.onMarkerDblClick(trip.arrival)}

            />
            <Polyline path={trip.path} options={{strokeWeight: 1}}/>
          </div>
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
        containerElement={<div style={{height: `400px`}}/>}
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
