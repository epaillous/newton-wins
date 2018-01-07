import { connect } from 'react-redux';
import loginComponent from '../components/login/loginComponent';
import { signInUser } from '../actions/users.actions';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    login: (email: string, password: string) => {
      const response = dispatch(signInUser({ email, password }));
      return response;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
