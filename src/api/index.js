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
// export const CONVERSION_URL = `https://etravelconversion.azurewebsites.net/${}/valid`;

export const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

API.interceptors.request.use(function (config) {
  const token = cookies.get("profile").accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const uploadImage = async (data, url) => {
  const checkArr = Array.isArray(data);
  if (checkArr) {
    const uploadPromises = data.map(async (item) => {
      if (item.image instanceof File) {
        const fileRef = ref(storage, `${url}/${item.image.name}`);
        await uploadBytes(fileRef, item.image);
        const downloadURL = await getDownloadURL(fileRef);
        item.image = downloadURL;
      }
    });

    await Promise.all(uploadPromises);

    return data;
  } else {
    const fileRef = ref(storage, `${url}/${data.image.name}`);
    await uploadBytes(fileRef, data.image);
    const urlRes = await getDownloadURL(fileRef);
    return urlRes;
  }
};

export const removeImage = (item, url) => {
  const fileRef = ref(storage, `${url}/${item.image.name}`);
  deleteObject(fileRef)
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const uploadVoiceFile = (item) => {
  return API.post("portal/places/convert/mp3", item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

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

export const uploadFile = (files, path) => {
  return API.post(
    "/portal/azures/image",
    files,
    { params: { imagePath: path } },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const removeFile = (path, name) => {
  return API.post(`${BASE_URL}/portal/azures/image`, null, {
    params: { imagePath: path, imageName: name },
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

export const process = async (state, dispatch, setState, path, item) => {
  if (state.isFetching) {
    return Promise.reject(new Error("This item is being processed."));
  }

  try {
    dispatch(setState({ isFetching: true }));

    //Upload voice file
    if (item.placeDescriptions?.length > 0) {
      let formData = new FormData();
      item.placeDescriptions.forEach((element) => {
        if (element.voiceFile instanceof File) {
          formData.append("listMp3", element.voiceFile);
        }
      });
      const { data } = await uploadVoiceFile(formData);
      data.voiceFiles.forEach((itm) => {
        const indexFile = item.placeDescriptions.findIndex(
          (file) => itm.fileName === file.voiceFile.name
        );
        if (indexFile !== -1) {
          item.placeDescriptions[indexFile].voiceFile = itm.fileLink;
        }
      });
    }

    if (item.placeImages) {
      const response = await uploadImage(
        item.placeImages,
        `place/PlaceImg/${item.name}`
      );
      item.placeImages = response;
    }

    //Upload image tour
    if (item.image instanceof File) {
      let formData = new FormData();
      formData.append("file", item.image);
      const { data } = await uploadFile(formData, "Tour");
      item.image = data.link;
    }

    //Upload language file
    if (item.fileLink instanceof File) {
      let formData = new FormData();
      formData.append("file", item.fileLink);

      const { data } = await uploadFile(formData, "Language/FileTranslate");
      item.fileLink = data.link;
    }

    await API.post(path, item);
    dispatch(setState({ isFetching: false }));
    return Promise.resolve();
  } catch (e) {
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
