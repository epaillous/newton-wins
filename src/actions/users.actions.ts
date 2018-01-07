import { generateAuthActions } from 'redux-token-auth';
import { ROOT_URL } from './utils';

const authUrl = ROOT_URL + '/auth';

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
  },
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config);


export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
};
