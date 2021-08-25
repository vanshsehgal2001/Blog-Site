import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from "./reducers/main";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  mainReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
