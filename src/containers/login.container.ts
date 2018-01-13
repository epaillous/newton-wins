import { connect } from 'react-redux';
import { emailSignIn } from 'redux-auth';
import { closeModal } from '../actions/modal.actions';
import { fetchSuggestions } from '../actions/suggestions.actions';
import loginComponent from '../components/login/login.component';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
    fetchSuggestions: () => {
      dispatch(fetchSuggestions());
    },
    login: (email: string, password: string) => {
      const response = dispatch(emailSignIn({ email, password }));
      return response;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
