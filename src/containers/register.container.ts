import { connect } from 'react-redux';
import { emailSignUp } from 'redux-auth';
import { errorOnRegister, showSignUp } from '../actions/auth.actions';
import { formWasValidated } from '../actions/modal.actions';
import registerComponent from '../components/register/register.component';
import { User } from '../models/user';

const mapStateToProps = (state: any) => {
  return {
    errors: state.register.errors
  };
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
      return response
        .catch((jsonResponse: any) => dispatch(errorOnRegister(jsonResponse)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(registerComponent);
