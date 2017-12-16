import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


export interface GoogleMapProps { isMarkerShown: boolean; framework: string; }

const GoogleMapComponent = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap)((props: any) =>
    (
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: -33.44889, lng: -70.669265 }}
    >
        <Marker position={{ lat: -33.44889, lng: -70.669265 }} onClick={props.onMarkerClick} />
    </GoogleMap>
    )
);

class MainMapComponent extends React.PureComponent {

    render() {
        return (
            <GoogleMapComponent />
        );
    }
}

export default MainMapComponent;
