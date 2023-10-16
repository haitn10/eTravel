import { SET_BOOKINGS_STATE } from "../action";

const tours = (
  state = { isFetching: false, items: [], details: [] },
  action
) => {
  switch (action.type) {
    case SET_BOOKINGS_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default tours;
