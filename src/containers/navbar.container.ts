import { connect } from 'react-redux';
import { signOut } from 'redux-auth';
import { fetchMenu, selectMenuItem } from '../actions/menu.actions';
import { toggleNavbar } from '../actions/navbar.actions';
import NavBarComponent from '../components/navBar/navBar.component';
import { MenuItem } from '../models/menuItem';

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
    logout: () => {
      dispatch(signOut());
    },
    selectMenuItem: (item: MenuItem) => {
      dispatch(selectMenuItem(item));
    },
    toggleNavbar: () => {
      dispatch(toggleNavbar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
