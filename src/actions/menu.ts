import { MenuItem, MenuItemInterface } from '../models/menuItem';
import wretch from 'wretch';
import { ROOT_URL } from './utils';

export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';
export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

function fetchMenuSuccess(menuItems: MenuItem[]) {
  return {
    type: FETCH_MENU_SUCCESS,
    payload: menuItems
  };
}

function fetchMenuFailure(error: any) {
  return {
    type: FETCH_MENU_FAILURE,
    payload: error
  };
}

function requestMenu() {
  return {
    type: FETCH_MENU,
    payload: {}
  };
}

export function selectMenuItem(menuItem: MenuItem) {
  return {
    type: SELECT_MENU_ITEM,
    payload: menuItem
  };
}

export function fetchMenu() {
  return (dispatch: any) => {
    dispatch(requestMenu);
    return wretch(ROOT_URL + '/menu').get()
      .json(json => {
        let menuItems = json.menu.map((item: MenuItemInterface) => new MenuItem(item));
        console.log(menuItems);
        dispatch(fetchMenuSuccess(menuItems));
      })
      .catch((error: any) => {
        dispatch(fetchMenuFailure(error));
      });
  };
}
