import { connect } from 'react-redux';
import { emailSignIn } from 'redux-auth';
import { showSignUp } from '../actions/auth.actions';
import { closeModal, formWasValidated } from '../actions/modal.actions';
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
    goToSignUp: () => {
      dispatch(showSignUp());
    },
    login: (email: string, password: string) => {
      if (!email || !password) {
        dispatch(formWasValidated());
        return;
      }
      const response = dispatch(emailSignIn({ email, password }));
      return response.then(() => dispatch(closeModal()));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
