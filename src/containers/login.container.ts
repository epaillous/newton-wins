import { connect } from 'react-redux';
import loginComponent from '../components/login/login.component';
import { emailSignIn } from 'redux-auth';
import { closeModal } from '../actions/modal.actions';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    login: (email: string, password: string) => {
      const response = dispatch(emailSignIn({ email, password }));
      return response;
    },
    closeModal: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
