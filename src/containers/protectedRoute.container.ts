import { connect } from 'react-redux';
import { ProtectedRoute } from '../components/protectedRoute/protectedRoute.component';

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.getIn(['user', 'isSignedIn']),
    authenticationPath: '/login',
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
