import { combineReducers } from "redux";
import amountReducers from "./amountReducers";

const rootReducer = combineReducers({
  amount: amountReducers,
});
export default rootReducer;
