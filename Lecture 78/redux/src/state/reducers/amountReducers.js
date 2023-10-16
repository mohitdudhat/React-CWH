const reducer = (state = 0, action) => {
  if (action.type === "deposit") {
    return state + action.amount;
  } else if (action.type === "withdraw") {
    return state - action.amount;
  } else {
    return state;
  }
};
export default reducer;
