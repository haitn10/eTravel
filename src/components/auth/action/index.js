import axios from "axios";
import { BASE_URL } from "../../../api";
import Cookies from "universal-cookie";
import { ERR_NETWORK } from "../../../constants/status";

export const SET_PROFILE_STATE = "SET_PROFILE_STATE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const LOG_OUT = "LOG_OUT";

const cookies = new Cookies();

export const setState = (state) => ({
  type: SET_PROFILE_STATE,
  state,
});

export const getProfile = () => {
  return async (dispatch, getState) => {
    const state = getState().auth;
    if (state.isLoggingIn) {
      return Promise.reject(new Error("You are being logged in.").message);
    }

    dispatch(setState({ isLoggingIn: true }));
    const profile = cookies.get("profile");
    if (!profile || profile === "null") {
      dispatch(setState({ isLoggingIn: false, profile: null }));
      return Promise.resolve();
    }
    dispatch(setState({ isLoggingIn: false, profile: profile }));
    return Promise.resolve();
  };
};

export const login = (credential) => async (dispatch, getState) => {
  const state = getState().auth;
  if (state.isLoggingIn) {
    return Promise.reject(new Error("You are being logged in.").message);
  }

  try {
    dispatch(setState({ isLoggingIn: true }));
    const { data: res } = await axios.post(
      `${BASE_URL}/api/auth/admin/login`,
      credential
    );
    dispatch(setState({ isLoggingIn: false, profile: res.account }));
    cookies.set("profile", res.account, { path: "/" });
    return Promise.resolve(res.account);
  } catch (e) {
    dispatch(setState({ isLoggingIn: false }));
    if (e.code === ERR_NETWORK) {
      return Promise.reject(e.message);
    }
    const message = e.response.data ? e.response.data.message : e.message;
    return Promise.reject(message);
  }
};

export const logOut = () => ({
  type: LOG_OUT,
});
