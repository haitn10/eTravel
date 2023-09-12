import { SET_HOMEPAGE_STATE } from "../action";

const homepage = (
  state = {
    shouldFetch: true,
    isFetching: false,
    items: [],
    isUpdating: false,
  },
  action
) => {
  switch (action.type) {
    case SET_HOMEPAGE_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default homepage;
