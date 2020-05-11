import { firebase } from './firebase.environment';

export const environment = {
  production: true,
  firebaseAPIKey: firebase.api
};
