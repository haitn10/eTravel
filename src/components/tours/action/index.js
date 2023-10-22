import { API, fetch, process, uploadImage } from "../../../api";

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

export const getTourDetails = async (tourId) => {
  try {
    const { data } = await API.get(`portal/tours/${tourId}`);
    return Promise.resolve(data.tour);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const processTour = (tour) => {
  return async (dispatch, getState) => {
    return process(getState().tours, dispatch, setState, "portal/tours", tour);
  };
};

export const updateTour = async (tourId, values) => {
  try {
    if (values.image instanceof File) {
      const response = await uploadImage(values, "Tour");
      values.image = response;
    }
    const { data } = await API.put(`portal/tours/${tourId}`, values);
    return Promise.resolve(data);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
