import { connect } from 'react-redux';
import loginComponent from '../components/login/loginComponent';
import { signInUser } from '../actions/users.actions';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (email: string, password: string) => {
      dispatch(signInUser({ email, password }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
