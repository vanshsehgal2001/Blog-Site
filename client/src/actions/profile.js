import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  CREATE_UPDATE_PROFILE,
  DELETE_EXP,
} from "../types";
import axios from "axios";
import { setAlert } from "../actions/alert";

export const getMyProfile = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/profile");
      // console.log(response);
      // console.log("lol");
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

export const getUserProfile = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/profile/${id}`);
      console.log(response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

export const createUpdateProfile = (data, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/profile", data, config);
      console.log(response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
    } catch (err) {
      const errors = err.response.data.errors;

      // console.log(err.response.data.errors)

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PROFILE,
    });
    try {
      const response = await axios.get("/profile/all");
      console.log(response);
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

export const addEducation = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/profile/education", data, config);
      console.log(response.data);
      dispatch({
        type: CREATE_UPDATE_PROFILE,
        payload: response.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      // console.log(err.response.data.errors)

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

export const addExperience = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/profile/experience", data, config);
      console.log(response.data);
      dispatch({
        type: CREATE_UPDATE_PROFILE,
        payload: response.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      // console.log(err.response.data.errors)

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

export const deleteExperience = (id) => {
  return async (dispatch) => {
    console.log(id);

    try {
      const res = await axios.delete(`/profile/experience/${id}`);
      dispatch({
        type: CREATE_UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

export const deleteEducation = (id) => {
  return async (dispatch) => {
    console.log(id);

    try {
      const res = await axios.delete(`/profile/education/${id}`);
      dispatch({
        type: CREATE_UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
