import { API, fetch, process } from "../../../api";

export const SET_TRANSACTIONS_STATE = "SET_TRANSACTIONS_STATE";

export const ADD_TOUR = "ADD_TOUR";

const setState = (state) => ({
  type: SET_TRANSACTIONS_STATE,
  state,
});

export const getTours = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().tours,
      dispatch,
      setState,
      "portal/transactions",
      payload
    );
  };
};
