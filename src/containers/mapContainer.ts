import { connect } from 'react-redux';
import { fetchTrips } from '../actions/trips';
import MainMap from '../components/mainMap';

const mapStateToProps = (state: any) => {
  return {
    tripsList: state.trips.tripsList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrips: () => {
      dispatch(fetchTrips());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);