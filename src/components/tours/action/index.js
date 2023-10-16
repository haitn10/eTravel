import { API, fetch, process } from "../../../api";

export const SET_TOURS_STATE = "SET_TOURS_STATE";

export const ADD_TOUR = "ADD_TOUR";

const setState = (state) => ({
  type: SET_TOURS_STATE,
  state,
});

export const getTours = (payload) => {
  return async (dispatch, getState) => {
    return fetch(getState().tours, dispatch, setState, "portal/tours", payload);
  };
};
