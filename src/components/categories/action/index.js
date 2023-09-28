import { API, fetch, process } from "../../../api";

export const SET_CATEGORIES_STATE = "SET_CATEGORIES_STATE";

export const ADD_CATEGORIE = "ADD_CATEGORIE";

const setState = (state) => ({
  type: SET_CATEGORIES_STATE,
  state,
});

export const getCategories = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().categories,
      dispatch,
      setState,
      "portal/users/operator",
      payload
    );
  };
};

export const getCategorieDetails = async (CategorieId) => {
  try {
    const { data } = await API.get(`portal/users/operator/${CategorieId}`);
    return Promise.resolve(data.account);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export const processCategorie = (Categorie) => {
  return async (dispatch, getState) => {
    return process(
      getState().Categories,
      dispatch,
      setState,
      "portal/users/operator",
      Categorie
    );
  };
};
