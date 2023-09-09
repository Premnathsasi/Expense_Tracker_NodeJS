const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");
const s3service = require("../services/s3service");

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
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const data = await req.user.getExpenses();
    if (data) {
      const paginatedProducts = data.slice(startIndex, endIndex);
      const totalPages = Math.ceil(data.length / pageSize);
      return res.status(200).json({
        data: paginatedProducts,
        totalPages,
      });
    } else {
      return res.status(400).json({ error: "No data found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const expense = await req.user.getExpenses();
    console.log(expense);
    const filename = `${req.user.name}/Expense${new Date().toLocaleString()}`;
    const fileURL = await s3service.uploadToS3(
      JSON.stringify(expense),
      filename
    );
    if (fileURL) {
      await req.user.createFilelink({ fileUrl: fileURL });
      return res.status(200).json({ fileURL });
    } else {
      return res
        .status(500)
        .json({ error: "Internal server error", success: false });
    }
  } catch (err) {
    return res.status(400).json({ error: err, success: false });
  }
};
