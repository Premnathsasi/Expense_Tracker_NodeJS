const express = require("express");
const expenseController = require("../controllers/expense");

const router = express.Router();

router.post("/addexpense", expenseController.addExpense);

router.delete("/deleteExpense/:id", expenseController.deleteExpense);

router.get("/getexpense", expenseController.getAllExpense);

module.exports = router;
