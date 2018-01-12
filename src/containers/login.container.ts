import { connect } from 'react-redux';
import loginComponent from '../components/login/loginComponent';
import { emailSignIn } from 'redux-auth';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    login: (email: string, password: string) => {
      const response = dispatch(emailSignIn({ email, password }));
      return response;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
