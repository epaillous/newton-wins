import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Trip } from '../models/trip';
import * as moment from 'moment';

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD6U6m8yNBaX1O3tN_USErl1v-i_8pPibU';

interface GoogleMapProps {
  trips: Trip[];
}

interface TripsProps {
  trips: Trip[];
  loading: boolean;
  error: any;
}

interface Props {
  tripsList: TripsProps;
  fetchTrips(): void;
}

const GoogleMapComponent = withScriptjs(withGoogleMap((props: GoogleMapProps) =>
  (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={props.trips.filter(trip => trip.date.isSameOrBefore(moment()))[0].arrival.googleMapPoint}
    >
      {
        props.trips.filter(trip => trip.date.isSameOrBefore(moment())).map((trip) =>
          <div key={trip.id}>
          <Marker position={trip.arrival.googleMapPoint}/>
          <Polyline path={trip.path}/>
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
    const { trips, loading, error } = this.props.tripsList;

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
      />
    );
  }
}

export default MainMap;
