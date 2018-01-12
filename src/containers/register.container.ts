import { connect } from 'react-redux';
import registerComponent from '../components/register/register.component';
import { User } from '../models/user';
import { emailSignUp } from 'redux-auth';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (user: User) => {
      const body = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
      };
      const response = dispatch(emailSignUp(body));
      return response;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(registerComponent);
