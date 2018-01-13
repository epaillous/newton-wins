import { connect } from 'react-redux';
import PlaceResult = google.maps.places.PlaceResult;
import { selectPlace } from '../actions/search.actions';
import SearchBarComponent from '../components/searchBar/searchBar.component';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handlePlaceSelected: (place: PlaceResult) => {
      dispatch(selectPlace(place));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
