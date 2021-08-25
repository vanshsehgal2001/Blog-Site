import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACCOUNT_DELETED,
  USER_LOADED,
  AUTH_ERROR,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: null,
        token: localStorage.getItem("token"),
      };
      break;

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: null,
        token: localStorage.getItem("token"),
      };
      break;

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        token: null,
      };
      break;

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
      break;

    default:
      return state;
  }
};
