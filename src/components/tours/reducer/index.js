import { SET_TOURS_STATE } from "../action";

const categories = (
  state = { isFetching: false, items: [], details: [] },
  action
) => {
  switch (action.type) {
    case SET_TOURS_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default categories;
