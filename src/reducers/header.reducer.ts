import { SELECT_POINT } from '../actions/points.actions';

interface HeaderStateInterface {
  title: string;
  subtitle: string;
  flagCode: string;
}

interface StateInterface {
  header: HeaderStateInterface;
}

const INITIAL_STATE = { header: { title: '', subtitle: '', flagCode: '' } };

export default function header(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SELECT_POINT:
      return {
        ...state, title: action.payload.city.name,
        subtitle: action.payload.city.country.name,
        flagCode: action.payload.city.country.code,
      };
    default:
      return state;
  }
}
