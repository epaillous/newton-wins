import { connect } from 'react-redux';
import { emailSignUp } from 'redux-auth';
import { formWasValidated } from '../actions/modal.actions';
import registerComponent from '../components/register/register.component';
import { User } from '../models/user';
import { showSignUp } from '../actions/auth.actions';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openRegister: () => {
      dispatch(showSignUp());
    },
    register: (user: User) => {
      if (!user.valid) {
        dispatch(formWasValidated());
        return;
      }
      const body = {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
      };
      const response = dispatch(emailSignUp(body));
      return response;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(registerComponent);
