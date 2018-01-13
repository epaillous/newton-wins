import { connect } from 'react-redux';
import { ProtectedRoute } from '../components/protectedRoute/protectedRoute.component';

const mapStateToProps = (state: any) => {
  return {
    authenticationPath: '/login',
    isAuthenticated: state.auth.getIn(['user', 'isSignedIn']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
