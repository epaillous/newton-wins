import { connect } from 'react-redux';
import registerComponent from '../components/register/registerComponent';
import { User } from '../models/user';
import { registerUser } from '../actions/users.actions';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (user: User) => {
      dispatch(registerUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(registerComponent);
