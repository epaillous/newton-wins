import { connect } from 'react-redux';
import { fetchTrips } from '../actions/trips';
import MainMap from '../components/mainMapComponent';
import { Point } from '../models/point';
import { fetchArticle } from '../actions/articles';

const mapStateToProps = (state: any) => {
  return {
    tripsList: state.trips.tripsList,
    center: state.map.center
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrips: () => {
      dispatch(fetchTrips());
    },
    selectPoint: (point: Point) => {
      if (point.articles.length > 0) {
        dispatch(fetchArticle(point.articles[0].id));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
