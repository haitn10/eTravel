import axios from "axios";
import {
  API,
  fetch,
  process,
  uploadImage,
  uploadVoiceFile,
} from "../../../api";

export const SET_PLACES_STATE = "SET_PLACES_STATE";

export const ADD_TOUR = "ADD_TOUR";

const setState = (state) => ({
  type: SET_PLACES_STATE,
  state,
});

export const getPlaces = (payload) => {
  return async (dispatch, getState) => {
    return fetch(
      getState().places,
      dispatch,
      setState,
      "portal/places",
      payload
    );
  };
};

export const getPlaceDetails = async (placeId) => {
  try {
    const { data } = await API.get(`portal/places/${placeId}`);
    return Promise.resolve(data.place);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const checkDuplicateName = async (nameFile) => {
  try {
    const name = nameFile.slice(0, -4);
    const { data } = await axios.get(`http://localhost:3001/${name}/valid`);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const processPlace = (newPlace) => {
  return async (dispatch, getState) => {
    return process(
      getState().places,
      dispatch,
      setState,
      "portal/places",
      newPlace
    );
  };
};

export const updatePlace = async (placeId, values) => {
  try {
    setState({ isFetching: true });
    if (values.placeDescriptions.length > 0) {
      let formData = new FormData();
      values.placeDescriptions.forEach((element) => {
        if (element.voiceFile instanceof File) {
          formData.append("listMp3", element.voiceFile);
        }
      });
      if (Array.from(formData).length !== 0) {
        const { data } = await uploadVoiceFile(formData);
        data.voiceFiles.forEach((itm) => {
          const indexFile = values.placeDescriptions.findIndex(
            (file) => itm.fileName === file.voiceFile.name
          );
          if (indexFile !== -1) {
            values.placeDescriptions[indexFile].voiceFile = itm.fileLink;
          }
        });
      }
    }

    if (values.placeImages) {
      const response = await uploadImage(
        values.placeImages,
        `place/PlaceImg/${values.name}`
      );
      values.placeImages = response;
    }
    const { data } = await API.put(`portal/places/${placeId}`, values);
    setState({ isFetching: false });
    return Promise.resolve(data);
  } catch (e) {
    setState({ isFetching: false });
    return Promise.reject(e);
  }
};

export const importPlaceByFile = async (dataList) => {
  try {
    setState({ isFetching: true });
    let formData = new FormData();
    dataList.forEach((element) => {
      formData.append("fileList", element);
    });

    const { data } = await API.post(`portal/places/importexcel`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setState({ isFetching: false });
    return Promise.resolve(data);
  } catch (e) {
    setState({ isFetching: false });
    return Promise.reject(e);
  }
};
