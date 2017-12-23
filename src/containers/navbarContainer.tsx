import { connect } from 'react-redux';
import NavBarComponent from '../components/navBarComponent';
import { fetchMenu, selectMenuItem } from '../actions/menu';
import { MenuItem } from '../models/menuItem';

const mapStateToProps = (state: any) => {
  return {
    menuItems: state.navbar.menu.menuItems
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMenu: () => {
      dispatch(fetchMenu());
    },
    selectMenuItem: (item: MenuItem) => {
      dispatch(selectMenuItem(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);