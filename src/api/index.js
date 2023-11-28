import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const GOONG_MAPTILES_KEY = "foAIsmKSYDQOdkoRfIj1T1MbkKaIIq5vvwSXb50U";
export const GOONG_API_KEY = "lufMpKjvYBPBQqq13Zwl0vTLnPUHtkksPTV1YcEs";
export const GOONG_URL = "https://rsapi.goong.io/Place/AutoComplete";

// URL
// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://etravelapi.azurewebsites.net";
// export const CONVERSION_URL = `https://etravelconversion.azurewebsites.net/${}/valid`;

export const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

API.interceptors.request.use(function (config) {
  const token = cookies.get("profile").accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const convertVoiceFile = (item) => {
  return API.post("portal/places/convert/mp3", item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeVoiceFile = (name) => {
  return API.delete("portal/azures/fileName", {
    params: { fileName: name },
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
  return API.delete("portal/azures/image", {
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

    //Convert voice file
    if (item.placeDescriptions) {
      let formData = new FormData();
      item.placeDescriptions.forEach((description) => {
        if (description.voiceFile instanceof File) {
          formData.append("listMp3", description.voiceFile);
        }
      });

      // Check if formData has data before calling convertVoiceFile
      if (
        formData &&
        formData.getAll &&
        formData.getAll("listMp3").length > 0
      ) {
        const { data } = await convertVoiceFile(formData);
        data.voiceFiles.forEach((itm) => {
          const indexFile = item.placeDescriptions.findIndex(
            (file) => itm.fileName === file.voiceFile.name
          );
          if (indexFile !== -1) {
            item.placeDescriptions[indexFile].voiceFile = itm.fileLink;
          }
        });
      }
    }

    //Upload image place
    if (item.placeImages) {
      let formData = new FormData();
      item.placeImages.forEach((img) => {
        if (img.image instanceof File) {
          formData.append("file", img.image);
        }
      });

      // Check if formData has data before calling uploadFile
      if (formData && formData.getAll && formData.getAll("file").length > 0) {
        const { data } = await uploadFile(
          formData,
          `place/PlaceImg/${item.name}`
        );
        data.imageFiles.forEach((itm) => {
          const indexItem = item.placeImages.findIndex(
            (file) => itm.fileName === file.image.name
          );
          if (indexItem !== -1) {
            item.placeImages[indexItem].image = itm.fileLink;
          }
        });
      }
    }

    //Upload image beacon
    if (item.placeItems && item.placeItems.length > 0) {
      let formData = new FormData();
      item.placeItems.forEach((beacon) => {
        if (beacon.image instanceof File) {
          formData.append("file", beacon.image);
        }
      });

      // Check if formData has data before calling uploadFile
      if (formData && formData.getAll && formData.getAll("file").length > 0) {
        const { data } = await uploadFile(
          formData,
          `place/PlaceItemImg/${item.name}`
        );
        data.imageFiles.forEach((itm) => {
          const indexItem = item.placeItems.findIndex(
            (file) => itm.fileName === file.image.name
          );
          if (indexItem !== -1) {
            item.placeItems[indexItem].image = itm.fileLink;
          }
        });
      }
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
