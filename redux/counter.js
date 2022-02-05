export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

const initialState = {
  server: "",
  client: "",
  counter: 0,
};

// Creating my reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT_COUNTER:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
