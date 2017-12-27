import { SELECT_POINT } from '../actions/points';

interface HeaderStateInterface {
  title: string;
  subtitle: string;
}

interface StateInterface {
  header: HeaderStateInterface;
}

const INITIAL_STATE = {header: {title: '', subtitle: ''}};

export default function headerReducer(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SELECT_POINT:
      return {...state, title: action.payload.city.name, subtitle: action.payload.city.country.name};
    default:
      return state;
  }
}
