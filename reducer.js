import { HYDRATE } from "next-redux-wrapper";
import { SAGA_ACTION_SUCCESS } from "./saga";

const initialState = { page: "" };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SAGA_ACTION_SUCCESS:
      return { ...state, page: action.data };
    default:
      return state;
  }
}

export default rootReducer;
