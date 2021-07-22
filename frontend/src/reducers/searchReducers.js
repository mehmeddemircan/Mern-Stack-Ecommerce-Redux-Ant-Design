import { SEARCH_QUERY } from "../constants/searchConstants";

export default (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, loading: true, text: action.payload.text };

    default:
      return state;
  }
};
