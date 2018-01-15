import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import LatLngLiteral = google.maps.LatLngLiteral;

interface Props {
  position: LatLngLiteral;
  icon: string;
  title: string;
  isOpened?: boolean;
}

interface State {
  isOpened: boolean;
}

class InfoWindowMarkerComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { isOpened: props.isOpened !== undefined ? props.isOpened : true };
    this.onClick = this.onClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  public render() {
    return (
      <Marker
        position={this.props.position}
        icon={this.props.icon}
        title={this.props.title}
        onClick={this.onClick}
      >
        {this.state.isOpened && <InfoWindow onCloseClick={this.onCloseClick}>{this.props.children}</InfoWindow>}
      </Marker>
    );
  }

  private onCloseClick() {
    this.setState({ isOpened: false });
  }

  private onClick() {
    this.setState({ isOpened: true });
  }
}

export default InfoWindowMarkerComponent;
