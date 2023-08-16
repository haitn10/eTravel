import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reduxReset from "redux-reset";

import auth from "../components/auth/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ auth }),
  composeEnhancers(applyMiddleware(thunk), reduxReset())
);

export default store;
