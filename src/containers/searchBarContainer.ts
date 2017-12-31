import { connect } from 'react-redux';
import SearchBarComponent from '../components/searchBarComponent';
import PlaceResult = google.maps.places.PlaceResult;
import { selectPlace } from '../actions/search';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handlePlaceSelected: (place: PlaceResult) => {
      dispatch(selectPlace(place));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
