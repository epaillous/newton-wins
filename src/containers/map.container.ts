import { connect } from 'react-redux';
import { fetchArticle, resetArticle } from '../actions/articles.actions';
import { fetchMedias } from '../actions/medias.actions';
import { selectPoint, zoomOnPoint } from '../actions/points.actions';
import { fetchSuggestions } from '../actions/suggestions.actions';
import { fetchTrips } from '../actions/trips.actions';
import mainMapComponent from '../components/map/mainMap.component';
import { Point } from '../models/point';

const mapStateToProps = (state: any) => {
  return {
    center: state.map.center,
    place: state.map.place,
    suggestions: state.suggestions.suggestions,
    tripsList: state.trips.tripsList,
    zoom: state.map.zoom,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchArticleAndMedias: (point: Point) => {
      dispatch(selectPoint(point));
      if (point.articles.length > 0) {
        dispatch(fetchArticle(point.articles[0].id));
      } else {
        dispatch(resetArticle());
      }
      dispatch(fetchMedias(point));
    },
    fetchSuggestions: () => {
      dispatch(fetchSuggestions());
    },
    fetchTrips: () => {
      dispatch(fetchTrips());
    },
    zoomOnPoint: (point: Point) => {
      dispatch(zoomOnPoint(point));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainMapComponent);
