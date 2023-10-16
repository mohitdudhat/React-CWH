export const reducer = (state = 0, action) => {
  if (action.type === "deposite") {
    return state + action.amount;
  } else if (action.type === "withdraw") {
    return state - action.amount;
  } else {
    return state;
  }
};
