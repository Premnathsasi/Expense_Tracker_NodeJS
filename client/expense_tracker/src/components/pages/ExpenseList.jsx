/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./ExpenseList.module.css";
import axios from "axios";

const ExpenseList = (props) => {
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/expense/deleteExpense/${props.item.id}`
      );
      props.onDelete(props.item);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.item}>
        <span>₹{props.item.expenseamount}</span>
        <span>{props.item.expensetype}</span>
        <span>{props.item.expensedescription}</span>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </React.Fragment>
  );
};

export default ExpenseList;
