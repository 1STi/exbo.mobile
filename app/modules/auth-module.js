// Libs
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { facebook } from 'react-native-simple-auth';

// Action Types
const FACEBOOK_LOGIN = 'exbo/auth/FACEBOOK_LOGIN';
const LOGOUT = 'exbo/auth/LOGOUT';
const FACEBOOK_NAME = 'exbo/auth/FACEBOOK_NAME';

// Reducer
const initialState = {
  isLogged: undefined,
  token: undefined,
  facebookProfileName: undefined
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FACEBOOK_LOGIN:
    return Object.assign({}, state, {
      isLogged: true,
      token: action.info.credentials.access_token,
      facebookProfileName: `${action.info.user.first_name} ${action.info.user.last_name}`
    });
  case LOGOUT:
    return Object.assign({}, state, {
      isLogged: false,
      token: undefined,
      facebookProfileName: undefined
    });
  default:
    return state;
  }
}

// Action Creators
export const isLoggedFacebook = (info) => {
  return {
    type: FACEBOOK_LOGIN,
    info: info,
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// API & Async Stuff
export const facebookLogin = () => {
  return (dispatch) => {
    facebook({
      appId: '1382268781829087',
      callback: 'fb1382268781829087://authorize',
      scope: 'user_friends', // you can override the default scope here
      fields: ['email', 'first_name', 'last_name'], // you can override the default fields here
    }).then((response) => {
      dispatch(isLoggedFacebook(response));
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      // error.code
      // error.description
    });
  };
};

export const googleLogin = () => {
  return (dispatch) => {
    console.log('wololo');
  };
};

