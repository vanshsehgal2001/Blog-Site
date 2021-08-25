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
import setToken from "../utils/setToken";

import axios from "axios";
import { setAlert } from "../actions/alert";

export const loadUser = () => {
  return async (dispatch) => {
    // console.log(localStorage.token);
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const response = await axios.get("/auth");
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/auth/login", data, config);
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      console.log(err.response.data.errors);

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const register = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/user/register", data, config);
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      console.log(err.response.data.errors);

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
