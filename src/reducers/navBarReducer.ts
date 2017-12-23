import { FETCH_MENU, FETCH_MENU_SUCCESS } from '../actions/menu';
import { MenuItem } from '../models/menuItem';

interface MenuStateInterface {
  menuItems: MenuItem[];
  loading: boolean;
  error: any;
}

interface StateInterface {
  menu: MenuStateInterface;
}

const INITIAL_STATE = {menu: {menuItems: [], error: null, loading: false}};

export default function tripsReducer(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_MENU:
      return {...state, menu: {menuItems: [], error: null, loading: true}};
    case FETCH_MENU_SUCCESS:
      return {...state, menu: {menuItems: action.payload, error: null, loading: false}};
    default:
      return state;
  }
}
