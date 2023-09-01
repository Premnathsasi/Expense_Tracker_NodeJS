const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  expenseamount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expensetype: Sequelize.STRING,
  expensedescription: Sequelize.STRING,
});

module.exports = Expense;
