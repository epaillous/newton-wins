import { connect } from 'react-redux';
import { fetchSuggestionTypes } from '../actions/suggestions';
import { CreateSuggestionComponent } from '../components/createSuggestionComponent';

const mapStateToProps = (state: any) => {
  return {
    types: state.suggestions.types,
    suggestion: state.suggestions.activeSuggestion
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSuggestionTypes: () => {
      dispatch(fetchSuggestionTypes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuggestionComponent);
