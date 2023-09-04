const { Sequelize } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

exports.addExpense = async (req, res, next) => {
  try {
    let { expenseamount, expensetype, expensedescription } = req.body;

    const data = await req.user
      .createExpense({
        expenseamount,
        expensetype,
        expensedescription,
      })
      .then((result) => {
        User.increment(
          { totalCost: +expenseamount },
          { where: { id: req.user.id } }
        ).catch((err) => console.log(err));
        return res.status(201).json({ data: result });
      });
  } catch (err) {
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const userId = req.user.id;
    const data = await Expense.findOne({
      where: { id, userId },
    });
    if (!data) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await User.decrement(
      { totalCost: +data.expenseamount },
      { where: { id: userId } }
    );
    await data.destroy();

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.getAllExpense = async (req, res, next) => {
  try {
    req.user.getExpenses().then((expense) => {
      return res.status(200).json({
        data: expense,
      });
    });
  } catch (err) {
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};
