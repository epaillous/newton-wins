import * as React from 'react';
import { styles } from './styles';
import * as moment from 'moment';
import { Button } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow,
} from 'react-google-maps';
import { Trip } from '../../models/trip';
import { Suggestion } from '../../models/suggestion';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Point } from '../../models/point';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { MarkerForSuggestion } from './markerForSuggestion.component';
import { TripMarkerAndPolyline } from './tripMarkerAndPolyline.component';

interface GoogleMapProps {
  trips: Trip[];
  suggestions: Suggestion[];
  center: LatLng;
  zoom: number;
  place: PlaceResult;

  onMarkerClick(point: Point): void;

  onMarkerDblClick(point: Point): void;
}

export const GoogleMapComponent = withRouter(withScriptjs(withGoogleMap(
  (props: GoogleMapProps & RouteComponentProps<any>) => {
    const trips = props.trips.filter(trip => trip.date.isSameOrBefore(moment()));
    return (
      <GoogleMap
        zoom={props.zoom}
        center={props.center}
        defaultOptions={{
          styles,
          minZoom: 2,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
      >
        {
          trips.map((trip: Trip) =>
            <TripMarkerAndPolyline key={trip.id} trip={trip} {...props}/>,
          )
        }
        {
          props.suggestions.map((suggestion: Suggestion) =>
            <MarkerForSuggestion key={suggestion.id} suggestion={suggestion} {...props}/>,
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
