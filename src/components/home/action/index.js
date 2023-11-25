import { fetch } from "../../../api";

export const SET_HOMEPAGE_STATE = "SET_HOMEPAGE_STATE";

const setState = (state) => ({
  type: SET_HOMEPAGE_STATE,
  state,
});

export const getTotalData = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/statictical"
    );
  };
};

export const getOrdersData = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/order"
    );
  };
};

export const getLanguagesData = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/language"
    );
  };
};

export const getReveneData = (values) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/booking",
      values
    );
  };
};

export const getTopPlace = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/top/place"
    );
  };
};

export const getTotalDataAdmin = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/statictical/admin"
    );
  };
};

export const getNationalRank = () => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/national"
    );
  };
};

export const getUserData = (values) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().homepage,
      dispatch,
      setState,
      "portal/charts/user",
      values
    );
  };
};
