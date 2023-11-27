import { API, fetch, process, uploadFile } from "../../../api";

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
      let formData = new FormData();
      formData.append("file", values.image);
      const { data } = await uploadFile(formData, "Tour");
      values.image = data.link;
    }

    const { data } = await API.put(`portal/tours/${tourId}`, values);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getTourComments = async (tourId) => {
  try {
    const { data } = await API.get(`portal/feedbacks/${tourId}`);
    return Promise.resolve(data.feedbacks);
  } catch (e) {
    return Promise.reject(e);
  }
};
