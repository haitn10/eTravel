import { SET_STAFFS_STATE } from "../action";

const staffs = (
  state = { isFetching: false, items: [], details: [] },
  action
) => {
  switch (action.type) {
    case SET_STAFFS_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default staffs;
