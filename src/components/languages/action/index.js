import { API, fetch, process } from "../../../api";

export const SET_LANGUAGES_STATE = "SET_LANGUAGES_STATE";
export const GET_LANGUAGES_CODE = "GET_LANGUAGES_CODE";

const setState = (state) => ({
  type: SET_LANGUAGES_STATE,
  state,
});

const getState = () => ({
  type: GET_LANGUAGES_CODE,
});

export const getLanguages = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().languages,
      dispatch,
      setState,
      "portal/languages",
      payload
    );
  };
};

export const getLanguageDetails = async (languageId) => {
  try {
    const { data } = await API.get(`languages/${languageId}`);
    return Promise.resolve(data.language);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export const getLanguageCode = async () => {
  try {
    if (getState.languagesCode !== undefined) {
      return Promise.resolve(getState.languagesCode);
    }
    setState({ isFetching: true });
    const { data } = await API.get(`portal/languages/languagecode`);
    setState({ isFetching: false, languageCode: data.languagesCode });
    return Promise.resolve(data.languagesCode);
  } catch (e) {
    setState({ isFetching: false });
    return Promise.reject(e);
  }
};

export const processLanguage = (language) => {
  return async (dispatch, getState) => {
    return process(
      getState().languages,
      dispatch,
      setState,
      "languages",
      language
    );
  };
};
