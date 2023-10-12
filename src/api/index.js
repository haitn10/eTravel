import axios from "axios";
import Cookies from "universal-cookie";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";

const cookies = new Cookies();

// URL
export const BASE_URL = "http://localhost:8000";
// export const BASE_URL = "https://etravelapi.azurewebsites.net";

export const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

API.interceptors.request.use(function (config) {
  const token = cookies.get("profile").accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const upload = (item, file) => {
  const fileRef = ref(
    storage,
    `Language/FileTranslate/${item.languageCode}.json`
  );
  return uploadBytes(fileRef, file).then(async () => {
    try {
      const url = await getDownloadURL(fileRef);
      return Promise.resolve(url);
    } catch (err) {
      return Promise.reject(err);
    }
  });
};

export const remove = (item) => {
  const fileRef = ref(
    storage,
    `Language/FileTranslate/${item.languageCode}.json`
  );
  deleteObject(fileRef)
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const fetch = async (state, dispatch, setState, path, payload) => {
  if (state.isFetching) {
    return Promise.resolve(state.items);
  }

  try {
    dispatch(setState({ isFetching: true }));
    const { data } = await API.get(path, { params: payload });
    dispatch(setState({ isFetching: false, items: data }));
    return Promise.resolve(data);
  } catch (e) {
    dispatch(setState({ isFetching: false }));
    return Promise.reject(e);
  }
};

export const process = async (state, dispatch, setState, path, item, file) => {
  if (state.isFetching) {
    return Promise.reject(new Error("This item is being processed."));
  }

  try {
    dispatch(setState({ isFetching: true }));

    // if (item.bannerImageUrl instanceof File) {
    //   let formData = new FormData();
    //   if (item.bannerImageUrl.type.includes("video")) {
    //     formData.append("video", item.bannerImageUrl);
    //   } else {
    //     formData.append("image", item.bannerImageUrl);
    //   }
    //   const response = await upload(formData);
    //   item.bannerImageUrl = `${baseURL}${response.data.url}`;
    // }

    // if (item.thumbnailImageUrl instanceof File) {
    //   let formData = new FormData();
    //   formData.append("image", item.thumbnailImageUrl);
    //   const response = await upload(formData);
    //   item.thumbnailImageUrl = `${baseURL}${response.data.url}`;
    // }
    if (file instanceof File) {
      const response = await upload(item, file);
      item.fileLink = response;
    }
    await API.post(path, item);
    dispatch(setState({ isFetching: false }));
    return Promise.resolve();
  } catch (e) {
    await remove(item);
    dispatch(setState({ isFetching: false }));
    return Promise.reject(e);
  }
};

//   export const remove = async (
//     state,
//     dispatch,
//     addProcess,
//     removeProcess,
//     removeItem,
//     path,
//     itemId
//   ) => {
//     const processings = state.processings;
//     if (processings.includes(itemId)) {
//       return Promise.reject(new Error("This item is being deleted."));
//     }

//     dispatch(addProcess(itemId));
//     try {
//       await API.delete(`${path}/${itemId}`);
//       dispatch(removeItem(itemId));
//       dispatch(removeProcess(itemId));
//       return Promise.resolve();
//     } catch (e) {
//       dispatch(removeProcess(itemId));
//       return Promise.reject(e);
//     }
//   };
