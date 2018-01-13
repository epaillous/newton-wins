import { connect } from 'react-redux';
import { createSuggestion, fetchSuggestionTypes } from '../actions/suggestions.actions';
import CreateSuggestionComponent from '../components/suggestionForm/suggestionForm.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {
    types: state.suggestions.types,
    place: state.map.place,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    },
    createSuggestion: (suggestion: Suggestion) => {
      return dispatch(createSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
