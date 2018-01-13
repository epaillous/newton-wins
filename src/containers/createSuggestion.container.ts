import { connect } from 'react-redux';
import { createSuggestion, fetchSuggestionTypes } from '../actions/suggestions.actions';
import CreateSuggestionComponent from '../components/suggestionForm/suggestionForm.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {
    place: state.map.place,
    types: state.suggestions.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSuggestion: (suggestion: Suggestion) => {
      return dispatch(createSuggestion(suggestion));
    },
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
