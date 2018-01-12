import * as React from 'react';
import './searchBar.component.css';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { GOOGLE_URL } from '../../actions/utils';
import { withScriptjs } from 'react-google-maps';
import { compose, lifecycle, withProps } from 'recompose';
import PlaceResult = google.maps.places.PlaceResult;

interface Props {
  handlePlaceSelected: (place: PlaceResult) => void;
}

interface PlacesWithStandaloneSearchBoxProps {
  onSelectPlace: (place: PlaceResult) => void;
}

const PlacesWithStandaloneSearchBox =
  compose<any, PlacesWithStandaloneSearchBoxProps>(
    withProps({
      googleMapURL: GOOGLE_URL,
      loadingElement: <div style={{ height: `100%` }}/>,
    }),
    lifecycle({
      componentWillMount() {
        let searchBox: StandaloneSearchBox;

        this.setState({
          places: [],
          onSearchBoxMounted: (ref: StandaloneSearchBox) => {
            searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = searchBox.getPlaces();
            this.setState({
              places,
            });
            (this.props as PlacesWithStandaloneSearchBoxProps).onSelectPlace(places[0]);
          },
        });
      },
    }),
    withScriptjs,
  )((props: any) => (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            className={'search-bar'}
            type="text"
            placeholder="Suggérez nous un lieu !"
          />
        </StandaloneSearchBox>
      </div>
    ),
  );

class SearchBarComponent extends React.Component<Props> {

  render() {
    return <PlacesWithStandaloneSearchBox onSelectPlace={this.props.handlePlaceSelected}/>;
  }

}

export default SearchBarComponent;
