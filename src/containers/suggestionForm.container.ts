import { connect } from 'react-redux';
import { formWasValidated } from '../actions/modal.actions';
import { createSuggestion, fetchSuggestionTypes, updateSuggestion } from '../actions/suggestions.actions';
import CreateSuggestionComponent from '../components/suggestionForm/suggestionForm.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {
    editMode: state.suggestions.editMode,
    suggestion: state.suggestions.suggestion,
    types: state.suggestions.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSuggestion: (suggestion: Suggestion) => {
      if (!suggestion.valid) {
        dispatch(formWasValidated());
        return;
      }
      return dispatch(createSuggestion(suggestion));
    },
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    },
    updateSuggestion: (suggestion: Suggestion) => {
      if (!suggestion.valid) {
        dispatch(formWasValidated());
        return;
      }
      return dispatch(updateSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
