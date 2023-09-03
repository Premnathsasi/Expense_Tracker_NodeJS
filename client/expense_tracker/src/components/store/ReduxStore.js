import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./ExpenseSlice";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer },
});

export default store;
