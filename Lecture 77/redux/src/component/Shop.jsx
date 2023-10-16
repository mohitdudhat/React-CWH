import React from "react";
import { useSelector } from "react-redux";
export const Shop = () => {
  return (
    <div>
      <h2>Deposit/Withdraw Money</h2>
      <button className="btn btn-primary mx-2">-</button>
      Update Balance
      <button className="btn btn-primary mx-2">+</button>
    </div>
  );
};
