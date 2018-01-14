import { connect } from 'react-redux';
import { signOut } from 'redux-auth';
import { showLogin } from '../actions/auth.actions';
import { fetchMenu } from '../actions/menu.actions';
import NavBarComponent from '../components/navBar/navBar.component';

const mapStateToProps = (state: any) => {
  const isSignedIn = state.auth.getIn(['user', 'isSignedIn']);
  let username = '';
  if (isSignedIn) {
    username = state.auth.getIn(['user', 'attributes', 'name']) ||
      state.auth.getIn(['user', 'attributes', 'first_name']) + ' ' +
      state.auth.getIn(['user', 'attributes', 'last_name']);
  }
  return {
    collapsed: state.navbar.collapsed,
    menuItems: state.navbar.menu.menuItems,
    signedIn: isSignedIn,
    userPicture: isSignedIn ?
      state.auth.getIn(['user', 'attributes', 'image']) : null,
    username,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMenu: () => {
      dispatch(fetchMenu());
    },
    goToLogin: () => {
      dispatch(showLogin());
    },
    logout: () => {
      dispatch(signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
