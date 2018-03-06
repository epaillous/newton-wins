import { connect } from 'react-redux';
import { emailSignIn } from 'redux-auth';
import { errorOnLogin, showLogin } from '../actions/auth.actions';
import { closeModal, formWasValidated } from '../actions/modal.actions';
import { fetchSuggestions } from '../actions/suggestions.actions';
import loginComponent from '../components/login/login.component';

const mapStateToProps = (state: any) => {
  return {
    errorMessage: state.login.errorMessage
  };
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
      if (!email || !password) {
        dispatch(formWasValidated());
        return;
      }
      const response = dispatch(emailSignIn({ email, password }));
      return response
        .then(() => dispatch(closeModal()))
        .catch((error: any) => dispatch(errorOnLogin(error)));
    },
    openLogin: () => {
      dispatch(showLogin());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
