const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const { expenseamount, expensetype, expensedescription } = req.body;
    req.user
      .createExpense({
        expenseamount,
        expensetype,
        expensedescription,
      })
      .then((data) => {
        return res.status(201).json({ data });
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
