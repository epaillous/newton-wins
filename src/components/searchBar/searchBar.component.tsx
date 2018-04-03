import * as React from 'react';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { compose, lifecycle, withProps } from 'recompose';
import { GOOGLE_URL } from '../../actions/utils';
import './searchBar.component.css';
import PlaceResult = google.maps.places.PlaceResult;

interface Props {
  handlePlaceSelected: (place: PlaceResult) => void;
  searchValue: string;
  searchValueChanged: (eventChange: any) => void;
}

interface PlacesWithStandaloneSearchBoxProps {
  onSelectPlace: (place: PlaceResult) => void;
  searchValue: string;
  searchValueChanged: (eventChange: any) => void;
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
          onPlacesChanged: () => {
            const places = searchBox.getPlaces();
            this.setState({
              places,
            });
            (this.props as PlacesWithStandaloneSearchBoxProps).onSelectPlace(places[0]);
          },
          onSearchBoxMounted: (ref: StandaloneSearchBox) => {
            searchBox = ref;
          },
          places: [],
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
            className="search-bar"
            type="search"
            placeholder="Suggérez nous un lieu !"
            value={props.searchValue}
            onChange={props.searchValueChanged}
          />
        </StandaloneSearchBox>
      </div>
    ),
  );

class SearchBarComponent extends React.Component<Props> {

  public render() {
    return (
      <PlacesWithStandaloneSearchBox
        onSelectPlace={this.props.handlePlaceSelected}
        searchValue={this.props.searchValue}
        searchValueChanged={this.props.searchValueChanged}
      />);
  }

}

export default SearchBarComponent;
