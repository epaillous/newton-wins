import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';


export interface GoogleMapProps { isMarkerShown: boolean; framework: string; }


const coords = [
    { lat: 38.72232629999999, lng: -9.139271399999984 },
    { lat: -12.0463731, lng: -77.042754 },
    { lat: -13.53195, lng: -71.96746259999998 }
];

const GoogleMapComponent = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD6U6m8yNBaX1O3tN_USErl1v-i_8pPibU',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap)((props: any) =>
    (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: -33.44889, lng: -70.669265 }}
    >
        <Polyline path={coords}></Polyline>
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
