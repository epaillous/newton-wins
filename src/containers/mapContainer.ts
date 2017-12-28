import { connect } from 'react-redux';
import { fetchTrips } from '../actions/trips';
import MainMap from '../components/mainMapComponent';
import { Point } from '../models/point';
import { fetchArticle } from '../actions/articles';
import { selectPoint, zoomOnPoint } from '../actions/points';
import { fetchMedias } from '../actions/medias';

const mapStateToProps = (state: any) => {
  return {
    tripsList: state.trips.tripsList,
    center: state.map.center,
    zoom: state.map.zoom
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrips: () => {
      dispatch(fetchTrips());
    },
    fetchArticleAndMedias: (point: Point) => {
      dispatch(selectPoint(point));
      if (point.articles.length > 0) {
        dispatch(fetchArticle(point.articles[0].id));
      }
      dispatch(fetchMedias(point));
    },
    zoomOnPoint: (point: Point) => {
      dispatch(zoomOnPoint(point));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
