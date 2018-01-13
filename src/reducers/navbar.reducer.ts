import { FETCH_MENU, FETCH_MENU_SUCCESS } from '../actions/menu.actions';
import { TOGGLE_NAVBAR } from '../actions/navbar.actions';
import { MenuItem } from '../models/menuItem';

interface MenuStateInterface {
  menuItems: MenuItem[];
  loading: boolean;
  error: any;
}

interface StateInterface {
  menu: MenuStateInterface;
  collapsed: boolean;
}

const INITIAL_STATE = { menu: { menuItems: [], error: null, loading: false }, collapsed: true };

export default function navbar(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return { ...state, collapsed: !state.collapsed };
    case FETCH_MENU:
      return { ...state, menu: { menuItems: [], error: null, loading: true } };
    case FETCH_MENU_SUCCESS:
      return { ...state, menu: { menuItems: action.payload, error: null, loading: false } };
    default:
      return state;
  }
}
