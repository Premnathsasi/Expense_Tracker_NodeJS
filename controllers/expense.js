const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let { expenseamount, expensetype, expensedescription } = req.body;

    const data = await req.user.createExpense(
      {
        expenseamount,
        expensetype,
        expensedescription,
      },
      { transaction: t }
    );
    await User.increment(
      { totalCost: +expenseamount },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    return res.status(201).json({ data: data });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const id = req.params.id * 1;
    const userId = req.user.id;
    const data = await Expense.findOne({
      where: { id, userId },
      transaction: t,
    });
    if (!data) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await User.decrement(
      { totalCost: +data.expenseamount },
      { where: { id: userId }, transaction: t }
    );
    await t.commit();
    await data.destroy();

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    await t.rollback();
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
