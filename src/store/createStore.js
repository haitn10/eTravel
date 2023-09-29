import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reduxReset from "redux-reset";

import auth from "../components/auth/reducer";
import homepage from "../components/home/reducer";
import users from "../components/users/reducer";
import staffs from "../components/staffs/reducer";
import categories from "../components/categories/reducer";
import languages from "../components/languages/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ auth, homepage, users, staffs, categories, languages }),
  composeEnhancers(applyMiddleware(thunk), reduxReset())
);

export default store;
