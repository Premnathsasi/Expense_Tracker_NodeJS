import { createSlice } from "@reduxjs/toolkit";
const initialState = { expense: [] };

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      state.expense.unshift(action.payload.expense);
    },
    deleteExpense(state, action) {
      state.expense = state.expense.filter(
        (item) => item.id !== action.payload.expense.id
      );
    },

    getExpense(state, action) {
      state.expense = action.payload.expense;
    },
  },
});

export const expenseActions = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
