/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { expenseActions } from "../store/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const expenseList = useSelector((state) => state.expense.expense);
  const dispatch = useDispatch();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/expense/getexpense",
          { headers: { Authorization: token } }
        );
        let newList = [];
        for (const i in res.data.data) {
          newList.unshift(res.data.data[i]);
        }
        dispatch(expenseActions.getExpense({ expense: newList }));
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [dispatch, token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let updatedList = {
      expenseamount: amountRef.current.value,
      expensetype: typeRef.current.value,
      expensedescription: descriptionRef.current.value,
    };
    try {
      const data = await axios
        .post("http://localhost:4000/expense/addexpense", updatedList, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res);
          dispatch(expenseActions.addExpense({ expense: updatedList }));
        });
    } catch (err) {
      console.log(err);
    }
    amountRef.current.value = "";
    typeRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const deleteHandler = (item) => {
    dispatch(expenseActions.deleteExpense({ expense: item }));
  };

  const newExpenseList = expenseList.map((item) => (
    <ExpenseList item={item} key={Math.random()} onDelete={deleteHandler} />
  ));

  return (
    <section className={classes.bg}>
      <div className={classes.main}>
        <form onSubmit={submitHandler} className={classes.forms}>
          <div className={classes.control}>
            <label htmlFor="expenseamount">Expense Amount</label>
            <input
              id="expenseamount"
              type="number"
              style={{ marginTop: "15px" }}
              className="form-control"
              ref={amountRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="expensetype">Expense Type</label>
            <select className="form-select ms-3" id="expensetype" ref={typeRef}>
              <option>Food</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Education</option>
              <option>Tour</option>
              <option>Others</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="expensedescription">Expense Description</label>
            <textarea
              type="text"
              id="expensedescription"
              className="form-control"
              ref={descriptionRef}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
      {newExpenseList}
    </section>
  );
};

export default ExpenseForm;
