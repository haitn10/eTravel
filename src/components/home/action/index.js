import { fetch } from "../../../api";

export const SET_HOMEPAGE_STATE = "SET_HOMEPAGE_STATE";

const setState = (state) => ({
  type: SET_HOMEPAGE_STATE,
  state,
});

export const getHomePageData = () => {
  return async (dispatch, getState) => {
    return fetch(getState().auth, dispatch, setState, "portal/charts");
  };
};
