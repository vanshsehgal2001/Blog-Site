import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  CREATE_UPDATE_PROFILE,
  DELETE_EXP,
} from "../types";

const initialState = {
  profile: null,
  error: null,
  loading: true,
  profiles: [],
  repos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case CREATE_UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
      break;
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: true,
      };
      break;

    // case DELETE_EXP:
    //   console.log(state);
    //   return state.profile.profile.experience.filter(
    //     (exp) => exp._id !== action.payload
    //   );

    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
      };

    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
      };
    default:
      return state;
  }
};
