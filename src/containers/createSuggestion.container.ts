import { connect } from 'react-redux';
import { createSuggestion, fetchSuggestionTypes } from '../actions/suggestions.actions';
import CreateSuggestionComponent from '../components/suggestionForm/suggestionFormComponent';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {
    types: state.suggestions.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    },
    createSuggestion: (suggestion: Suggestion) => {
      dispatch(createSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
