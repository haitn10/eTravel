import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// URL
export const DEVELOPMENT_URL = "";
export const BASE_URL = "http://localhost:8000";

export const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

API.interceptors.request.use(function (config) {
  const token = cookies.get("profile").accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const fetch = async (
  state,
  dispatch,
  setState,
  path,
  requireFetch = false
) => {
  if (!requireFetch) {
    if (!state.shouldFetch || state.isFetching) {
      return Promise.resolve(state.items);
    }
  }

  try {
    dispatch(setState({ isFetching: true }));

    const { data } = await API.get(path);
    dispatch(setState({ shouldFetch: false, isFetching: false, items: data }));
    return Promise.resolve(data);
  } catch (e) {
    dispatch(setState({ isFetching: false }));
    return Promise.reject(e);
  }
};

// export const process = async (
//     processings,
//     dispatch,
//     setState,
//     addProcess,
//     removeProcess,
//     processId,
//     path,
//     item
//   ) => {
//     if (processings.includes(processId)) {
//       return Promise.reject(new Error("This item is being processed."));
//     }

//     try {
//       dispatch(addProcess(processId));

//       if (item.bannerImageUrl instanceof File) {
//         let formData = new FormData();
//         if (item.bannerImageUrl.type.includes("video")) {
//           formData.append("video", item.bannerImageUrl);
//         } else {
//           formData.append("image", item.bannerImageUrl);
//         }
//         const response = await upload(formData);
//         item.bannerImageUrl = `${baseURL}${response.data.url}`;
//       }

//       if (item.thumbnailImageUrl instanceof File) {
//         let formData = new FormData();
//         formData.append("image", item.thumbnailImageUrl);
//         const response = await upload(formData);
//         item.thumbnailImageUrl = `${baseURL}${response.data.url}`;
//       }

//       if (item.pdfUrl instanceof File) {
//         let formData = new FormData();
//         formData.append("pdf", item.pdfUrl);
//         const response = await upload(formData);
//         item.pdfUrl = `${baseURL}${response.data.url}`;
//       }

//       await API.post(path, item);
//       dispatch(setState({ shouldFetch: true }));
//       dispatch(removeProcess(processId));
//       return Promise.resolve();
//     } catch (e) {
//       dispatch(removeProcess(processId));
//       return Promise.reject(e);
//     }
//   };

export const update = async () => {};

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
