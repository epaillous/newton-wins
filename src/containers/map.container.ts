import { connect } from 'react-redux';
import { fetchTrips } from '../actions/trips.actions';
import mainMapComponent from '../components/map/mainMapComponent';
import { Point } from '../models/point';
import { fetchArticle, resetArticle } from '../actions/articles.actions';
import { selectPoint, zoomOnPoint } from '../actions/points.actions';
import { fetchMedias } from '../actions/medias.actions';
import { Suggestion } from '../models/suggestion';
import { createSuggestion, initSuggestion } from '../actions/suggestions.actions';
import PlaceResult = google.maps.places.PlaceResult;

const mapStateToProps = (state: any) => {
  return {
    tripsList: state.trips.tripsList,
    center: state.map.center,
    zoom: state.map.zoom,
    place: state.map.place,
    activeSuggestion: state.suggestions.activeSuggestion,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSuggestion: (suggestion: Suggestion) => {
      dispatch(createSuggestion(suggestion));
    },
    fetchTrips: () => {
      dispatch(fetchTrips());
    },
    fetchArticleAndMedias: (point: Point) => {
      dispatch(selectPoint(point));
      if (point.articles.length > 0) {
        dispatch(fetchArticle(point.articles[0].id));
      } else {
        dispatch(resetArticle());
      }
      dispatch(fetchMedias(point));
    },
    zoomOnPoint: (point: Point) => {
      dispatch(zoomOnPoint(point));
    },
    initSuggestion: (place: PlaceResult) => {
      dispatch(initSuggestion(place));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainMapComponent);
