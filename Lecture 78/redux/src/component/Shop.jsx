import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreator } from "../state/index";
import { bindActionCreators } from "redux";

export const Shop = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);
  console.log(actions);
  const { depositMoney, withdrawMoney } = actions;
  return (
    <div>
      <h2>Deposit/Withdraw Money</h2>
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          dispatch(withdrawMoney(100));
        }}
      >
        -
      </button>
      Update Balance
      <button
        className="btn btn-primary mx-2"
        onClick={() => {
          dispatch(depositMoney(100));
        }}
      >
        +
      </button>
    </div>
  );
};
