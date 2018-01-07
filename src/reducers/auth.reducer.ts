import { reduxTokenAuthReducer } from 'redux-token-auth';

interface UserAttributesInterface {
  firstName: string | null;
  lastName: string | null;
}


interface CurrentUserInterface {
  isLoading: boolean;
  isSignedIn: boolean;
  attributes: UserAttributesInterface;
}

interface AuthInterface {
  currentUser: CurrentUserInterface;
}

const INITIAL_STATE = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null,
        lastName: null,
      },
    },
  },
};

export default function reduxTokenAuth(state: AuthInterface = INITIAL_STATE.reduxTokenAuth,
                                       action: any) {
  return reduxTokenAuthReducer(state, action);
}
