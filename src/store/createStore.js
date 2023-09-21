import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reduxReset from "redux-reset";

import auth from "../components/auth/reducer";
import homepage from "../components/home/reducer";
import users from "../components/users/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ auth, homepage, users }),
  composeEnhancers(applyMiddleware(thunk), reduxReset())
);

export default store;
