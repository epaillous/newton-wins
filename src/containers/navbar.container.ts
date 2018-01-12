import { connect } from 'react-redux';
import NavBarComponent from '../components/navBar/navBarComponent';
import { fetchMenu, selectMenuItem } from '../actions/menu.actions';
import { MenuItem } from '../models/menuItem';
import { toggleNavbar } from '../actions/navbar.actions';
import { signOut } from 'redux-auth';

const mapStateToProps = (state: any) => {
  const isSignedIn = state.auth.getIn(['user', 'isSignedIn']);
  let username = '';
  if (isSignedIn) {
    username = state.auth.getIn(['user', 'attributes', 'name']) ||
      state.auth.getIn(['user', 'attributes', 'first_name']) + ' ' +
      state.auth.getIn(['user', 'attributes', 'last_name']);
  }
  return {
    username,
    menuItems: state.navbar.menu.menuItems,
    collapsed: state.navbar.collapsed,
    signedIn: isSignedIn,
    userPicture: isSignedIn ?
      state.auth.getIn(['user', 'attributes', 'image']) : null,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMenu: () => {
      dispatch(fetchMenu());
    },
    selectMenuItem: (item: MenuItem) => {
      dispatch(selectMenuItem(item));
    },
    toggleNavbar: () => {
      dispatch(toggleNavbar());
    },
    logout: () => {
      dispatch(signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
