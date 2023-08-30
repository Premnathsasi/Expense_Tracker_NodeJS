const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-app", "root", "Prem@5522", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
