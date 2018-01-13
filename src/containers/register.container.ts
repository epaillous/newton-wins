import { connect } from 'react-redux';
import { emailSignUp } from 'redux-auth';
import registerComponent from '../components/register/register.component';
import { User } from '../models/user';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (user: User) => {
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
