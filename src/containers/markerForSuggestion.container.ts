import { connect } from 'react-redux';
import { editSuggestion } from '../actions/suggestions.actions';
import markerForSuggestion from '../components/map/markerForSuggestion.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSuggestion: (suggestion: Suggestion) => {
      dispatch(editSuggestion(suggestion));
    },
    editSuggestion: (suggestion: Suggestion) => {
      dispatch(editSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(markerForSuggestion);
