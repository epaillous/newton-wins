import { connect } from 'react-redux';
import PlaceResult = google.maps.places.PlaceResult;
import { searchValueChanged, selectPlace } from '../actions/search.actions';
import SearchBarComponent from '../components/searchBar/searchBar.component';

const mapStateToProps = (state: any) => {
  return {
    searchValue: state.searchBar.searchValue
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handlePlaceSelected: (place: PlaceResult) => {
      dispatch(selectPlace(place));
    },
    searchValueChanged: (eventChange: any) => {
      dispatch(searchValueChanged(eventChange.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
