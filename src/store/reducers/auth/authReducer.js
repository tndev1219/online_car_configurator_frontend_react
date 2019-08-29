import {
  LOGIN_SUCCESS,
  LOGOUT
} from '../../actions/auth/authTypes';

const initState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      };

    case LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
}

export default authReducer;