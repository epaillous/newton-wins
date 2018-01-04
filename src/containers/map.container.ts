import { connect } from 'react-redux';
import { fetchTrips } from '../actions/trips';
import mainMapComponent from '../components/map/mainMapComponent';
import { Point } from '../models/point';
import { fetchArticle, resetArticle } from '../actions/articles';
import { selectPoint, zoomOnPoint } from '../actions/points';
import { fetchMedias } from '../actions/medias';
import { Suggestion } from '../models/suggestion';
import { createSuggestion, initSuggestion } from '../actions/suggestions';
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
