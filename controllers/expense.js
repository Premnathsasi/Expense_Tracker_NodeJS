const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const { expenseamount, expensetype, expensedescription } = req.body;
    const data = await Expense.create({
      expenseamount,
      expensetype,
      expensedescription,
    });
    return res.status(201).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const data = await Expense.findByPk(id).then((expense) =>
      expense.destroy()
    );
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.getAllExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    return res.status(200).json({
      data: expenses,
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};
