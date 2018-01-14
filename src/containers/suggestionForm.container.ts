import { connect } from 'react-redux';
import { changeFormValidStatus } from '../actions/modal.actions';
import { createSuggestion, fetchSuggestionTypes, updateSuggestion } from '../actions/suggestions.actions';
import CreateSuggestionComponent from '../components/suggestionForm/suggestionForm.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  let suggestion: Suggestion;
  if (state.suggestions.suggestion) {
    suggestion = state.suggestions.suggestion;
  } else {
    suggestion = new Suggestion();
    suggestion.place = state.map.place;
  }
  return {
    editMode: state.suggestions.suggestion,
    place: state.map.place,
    suggestion,
    types: state.suggestions.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeFormValidStatus: (status: boolean) => {
      dispatch(changeFormValidStatus(status));
    },
    createSuggestion: (suggestion: Suggestion) => {
      return dispatch(createSuggestion(suggestion));
    },
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    },
    updateSuggestion: (suggestion: Suggestion) => {
      return dispatch(updateSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
