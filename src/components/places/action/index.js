import { API, fetch, process } from "../../../api";

export const SET_PLACES_STATE = "SET_PLACES_STATE";

export const ADD_TOUR = "ADD_TOUR";

const setState = (state) => ({
  type: SET_PLACES_STATE,
  state,
});

export const getTours = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().tours,
      dispatch,
      setState,
      "portal/places",
      payload
    );
  };
};
