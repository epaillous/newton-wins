import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { MenuItem, MenuItemInterface } from '../models/menuItem';
import { ROOT_URL } from './utils';

export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';
export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

interface MenuInterface {
  menu: MenuItemInterface[];
}

const fetchMenuSuccess: ActionCreator<Action> = (menuItems: MenuItem[]) => {
  return {
    payload: menuItems,
    type: FETCH_MENU_SUCCESS,
  };
};

const fetchMenuFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_MENU_FAILURE,
  };
};

const requestMenu: ActionCreator<Action> = () => {
  return {
    payload: {},
    type: FETCH_MENU,
  };
};

export const selectMenuItem: ActionCreator<Action> = (menuItem: MenuItem) => {
  return {
    payload: menuItem,
    type: SELECT_MENU_ITEM,
  };
};

export const fetchMenu: ActionCreator<ThunkAction<Promise<void>, any, void>> = () => {
  return (dispatch: Dispatch<Promise<void>>) => {
    dispatch(requestMenu);
    return fetch(ROOT_URL + '/menu')
      .then((response: Response) => response.json())
      .then((json: MenuInterface) => {
        const menuItems = json.menu.map((item: MenuItemInterface) => new MenuItem(item));
        dispatch(fetchMenuSuccess(menuItems));
      })
      .catch((error: Error) => {
        dispatch(fetchMenuFailure(error));
      });
  };
};
