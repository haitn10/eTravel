import { API, fetch } from "../../../api";

export const SET_STAFFS_STATE = "SET_STAFFS_STATE";

const setState = (state) => ({
  type: SET_STAFFS_STATE,
  state,
});

export const getStaffs = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().staffs,
      dispatch,
      setState,
      "portal/users/operator",
      payload
    );
  };
};

export const getStaffDetails = async (staffId) => {
  try {
    const { data } = await API.get(`/portal/users/operator/${staffId}`);
    return Promise.resolve(data.account);
  } catch (e) {
    return Promise.reject(e);
  }
};
