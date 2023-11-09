import { API, fetch, process } from "../../../api";

export const SET_STAFFS_STATE = "SET_STAFFS_STATE";
export const ADD_STAFF_PROCESS = "ADD_STAFF_PROCESS";
export const REMOVE_STAFF_PROCESS = "REMOVE_STAFF_PROCESS";

export const ADD_STAFF = "ADD_STAFF";

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
    const { data } = await API.get(`portal/users/operator/${staffId}`);
    return Promise.resolve(data.account);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const processStaff = (staff) => {
  return async (dispatch, getState) => {
    return process(
      getState().staffs,
      dispatch,
      setState,
      "portal/users/operator",
      staff
    );
  };
};

export const updateStaff = async (staffId, staff) => {
  try {
    const { data } = await API.put(`portal/users/operator/${staffId}`, staff);
    return Promise.resolve(data.account);
  } catch (e) {
    return Promise.reject(e);
  }
}
